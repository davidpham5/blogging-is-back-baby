#!/usr/bin/env node

/**
 * Fixes comma-separated `tags` values in markdown frontmatter,
 * converting them to proper YAML arrays.
 *
 * Usage:
 *   node bin/fix-frontmatter-tags.js                  # dry-run all content
 *   node bin/fix-frontmatter-tags.js --write           # fix all content in place
 *   node bin/fix-frontmatter-tags.js path/to/file.md   # dry-run one file
 *   node bin/fix-frontmatter-tags.js --write path/to/file.md
 */

const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");

// Frontmatter keys that should always be YAML arrays
const LIST_KEYS = ["tags"];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return { raw: match[0], body: match[1], start: 0, end: match[0].length };
}

function isCommaList(value) {
  // A value like "foo, bar, baz" — contains at least one comma
  // but is NOT already a YAML flow sequence like [foo, bar]
  return (
    typeof value === "string" &&
    value.includes(",") &&
    !value.startsWith("[")
  );
}

function fixFrontmatter(content) {
  const fm = parseFrontmatter(content);
  if (!fm) return null;

  let changed = false;
  let newBody = fm.body;

  for (const key of LIST_KEYS) {
    // Match "key: value" on a single line (not already a list)
    const regex = new RegExp(`^(${key}:)[ \\t]+(.+)$`, "m");
    const match = newBody.match(regex);
    if (!match) continue;

    const value = match[2].trim();
    if (!isCommaList(value)) continue;

    const items = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const yamlList = items.map((t) => `  - ${t}`).join("\n");
    newBody = newBody.replace(match[0], `${match[1]}\n${yamlList}`);
    changed = true;
  }

  if (!changed) return null;
  return content.replace(fm.raw, `---\n${newBody}\n---`);
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const fileArgs = args.filter((a) => a !== "--write");

  let files;
  if (fileArgs.length > 0) {
    files = fileArgs.map((f) => path.resolve(f));
  } else {
    files = await glob("**/*.md", { cwd: CONTENT_DIR, absolute: true });
  }

  let fixedCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const fixed = fixFrontmatter(content);
    if (!fixed) continue;

    fixedCount++;
    const rel = path.relative(process.cwd(), file);

    if (write) {
      fs.writeFileSync(file, fixed, "utf-8");
      console.log(`fixed: ${rel}`);
    } else {
      console.log(`would fix: ${rel}`);
    }
  }

  if (fixedCount === 0) {
    console.log("No comma-separated tags found.");
  } else if (!write) {
    console.log(`\n${fixedCount} file(s) to fix. Run with --write to apply.`);
  } else {
    console.log(`\n${fixedCount} file(s) fixed.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
