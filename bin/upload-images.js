#!/usr/bin/env node

/**
 * Uploads local images referenced from markdown to Cloudinary, rewrites the
 * markdown, and deletes local files. Handles two forms:
 *   - Obsidian wikilink:        ![[image.jpg]]
 *   - Local-path markdown:      ![alt](/content/<subfolder>/image.jpg)
 *
 * Usage:
 *   node bin/upload-images.js          # dry-run — prints what it would do
 *   node bin/upload-images.js --write  # upload, rewrite, delete, stage
 */

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");
const simpleGit = require("simple-git");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const WIKILINK_IMAGE_RE = /!\[\[([^\]]+\.(?:jpg|jpeg|png|webp))\]\]/gi;
const LOCAL_MD_IMAGE_RE = /!\[([^\]]*)\]\((\/content\/[^)\s]+\.(?:jpg|jpeg|png|webp))\)/gi;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUNDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUNDINARY_CLOUD_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUNDINARY_CLOUD_API_SECRET;

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-{2,}/g, "-");
}

function findImageFile(imageName, mdDir) {
  // First check same directory as the markdown file
  const sameDirPath = path.join(mdDir, imageName);
  if (fs.existsSync(sameDirPath)) return sameDirPath;

  // Fall back to searching all of src/content/ (handles Obsidian cross-references)
  const results = glob.sync(`**/${imageName}`, {
    cwd: CONTENT_DIR,
    absolute: true,
  });
  return results.length > 0 ? results[0] : null;
}

function getSubfolder(mdFilePath) {
  const relative = path.relative(CONTENT_DIR, mdFilePath);
  return relative.split(path.sep)[0];
}

function buildCloudinaryUrl(subfolder, sanitizedName) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/blog/${subfolder}/${sanitizedName}`;
}

function altTextFromFilename(filename) {
  const ext = path.extname(filename);
  return path.basename(filename, ext);
}

async function scanFiles() {
  const mdFiles = await glob("**/*.md", { cwd: CONTENT_DIR, absolute: true });
  const results = [];

  for (const mdFile of mdFiles) {
    const content = fs.readFileSync(mdFile, "utf-8");
    const wikilinkMatches = [...content.matchAll(WIKILINK_IMAGE_RE)];
    const mdMatches = [...content.matchAll(LOCAL_MD_IMAGE_RE)];
    if (wikilinkMatches.length === 0 && mdMatches.length === 0) continue;

    const mdDir = path.dirname(mdFile);
    const mdSubfolder = getSubfolder(mdFile);

    for (const match of wikilinkMatches) {
      const original = match[0];
      const imageName = match[1];
      const imagePath = findImageFile(imageName, mdDir);
      const sanitizedName = sanitizeFilename(imageName);
      const altText = altTextFromFilename(imageName);
      const cloudinaryUrl = buildCloudinaryUrl(mdSubfolder, sanitizedName);
      const rewritten = `![${altText}](${cloudinaryUrl})`;

      results.push({
        mdFile,
        original,
        rewritten,
        imagePath,
        sanitizedName,
        cloudinaryUrl,
        subfolder: mdSubfolder,
      });
    }

    for (const match of mdMatches) {
      const original = match[0];
      const altText = match[1];
      const contentPath = match[2]; // e.g. /content/amplify/foo.jpg
      const relFromContent = contentPath.replace(/^\/content\//, "");
      const imagePath = path.join(CONTENT_DIR, relFromContent);
      const exists = fs.existsSync(imagePath);
      const subfolder = relFromContent.split("/")[0];
      const imageName = path.basename(relFromContent);
      const sanitizedName = sanitizeFilename(imageName);
      const cloudinaryUrl = buildCloudinaryUrl(subfolder, sanitizedName);
      const rewritten = `![${altText}](${cloudinaryUrl})`;

      results.push({
        mdFile,
        original,
        rewritten,
        imagePath: exists ? imagePath : null,
        sanitizedName,
        cloudinaryUrl,
        subfolder,
      });
    }
  }

  return results;
}

async function dryRun(results) {
  if (results.length === 0) {
    console.log("No wikilink image embeds found.");
    return;
  }

  for (const r of results) {
    const rel = path.relative(process.cwd(), r.mdFile);
    if (!r.imagePath) {
      console.log(`WARN: ${rel}: ${r.original} — image file not found, would skip`);
    } else {
      console.log(`${rel}: ${r.original}`);
      console.log(`  → upload: ${path.relative(process.cwd(), r.imagePath)}`);
      console.log(`  → to:     blog/${r.subfolder}/${r.sanitizedName}`);
      console.log(`  → rewrite: ${r.rewritten}`);
    }
  }

  const uploadable = results.filter((r) => r.imagePath);
  console.log(
    `\n${uploadable.length} image(s) to upload. Run with --write to apply.`
  );
}

async function writeMode(results) {
  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  const git = simpleGit();
  let uploaded = 0;
  let failed = 0;

  // Group results by markdown file so we do one read-write per file
  const byFile = new Map();
  for (const r of results) {
    if (!byFile.has(r.mdFile)) byFile.set(r.mdFile, []);
    byFile.get(r.mdFile).push(r);
  }

  // Track which image files have been uploaded (by absolute path)
  // so we don't re-upload the same image referenced from multiple markdown files
  const uploadedImages = new Map(); // imagePath → cloudinaryUrl

  for (const [mdFile, entries] of byFile) {
    let content = fs.readFileSync(mdFile, "utf-8");
    const rel = path.relative(process.cwd(), mdFile);
    let fileModified = false;

    for (const r of entries) {
      if (!r.imagePath) {
        console.log(`WARN: ${rel}: ${r.original} — image file not found, skipping`);
        continue;
      }

      // Upload (or reuse URL if already uploaded from another file)
      if (!uploadedImages.has(r.imagePath)) {
        const publicId = `blog/${r.subfolder}/${path.basename(r.sanitizedName, path.extname(r.sanitizedName))}`;
        try {
          console.log(`Uploading: ${path.relative(process.cwd(), r.imagePath)} → ${publicId}`);
          await cloudinary.uploader.upload(r.imagePath, {
            public_id: publicId,
            overwrite: false,
            resource_type: "image",
          });
          uploadedImages.set(r.imagePath, r.cloudinaryUrl);
          uploaded++;
        } catch (err) {
          console.error(`FAIL: ${rel}: ${r.original} — upload failed: ${err.message}`);
          failed++;
          continue;
        }
      }

      content = content.replace(r.original, r.rewritten);
      fileModified = true;
    }

    if (fileModified) {
      fs.writeFileSync(mdFile, content, "utf-8");
      await git.add(mdFile);
      console.log(`Rewritten: ${rel}`);
    }
  }

  // Delete local image files that were uploaded
  for (const imagePath of uploadedImages.keys()) {
    const rel = path.relative(process.cwd(), imagePath);
    fs.unlinkSync(imagePath);
    await git.rm(imagePath, { "--cached": null }).catch(() => {
      // File might not be tracked by git — that's fine
    });
    console.log(`Deleted: ${rel}`);
  }

  console.log(`\n${uploaded} image(s) uploaded, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--write");

  if (write && (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET)) {
    console.error(
      "Missing Cloudinary credentials. Set CLOUNDINARY_CLOUD_NAME, CLOUNDINARY_CLOUD_API_KEY, CLOUNDINARY_CLOUD_API_SECRET in .env"
    );
    process.exit(1);
  }

  const results = await scanFiles();

  if (write) {
    await writeMode(results);
  } else {
    await dryRun(results);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
