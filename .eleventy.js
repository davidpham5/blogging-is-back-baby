const filters = require("./lib/filters");
const collections = require("./lib/collections");
const { slugify } = require("./lib/filters");
const shortcodes = require("./lib/shortcodes");
const transforms = require("./lib/transforms");
const asyncFilters = require('./lib/async-filters');
const ObjectCache = require("./lib/helpers/cache");
const fs = require("fs");
const pluginDrafts = require("./eleventy.config.drafts.js");
const { DateTime } = require("luxon");
const { dayOfTheWeek } = require("./lib/helpers/dayOfTheWeek");
require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("preprocessFrontMatter", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".md")) {
      // Replace templator placeholders with valid dates
      content = content.replace(/date: "<% tp\.file\.creation_date\(\) %>"/g, `date: "${DateTime.now().toISODate()}"`);
    }
    return content;
  });

	eleventyConfig.setUseGitIgnore(false);
	// So that file creation on `.before` doesn't trigger a rebuild
	eleventyConfig.setWatchThrottleWaitTime(5000);
	eleventyConfig.on(
		"eleventy.before",
		async ({ dir, runMode, outputMode }) => {
			// Run me before the build starts
			console.log("Before Build", dir, runMode, outputMode);
      const util = require('util');
      const exec = util.promisify(require('node:child_process').exec);
      await exec('npx browserify ./public/scripts/contrast-calc.js > ./public/scripts/contrast-ratio.js');
      return;
			const tvProcessor = require("./bin/enrichers/tv");
			const tvResults = await tvProcessor.writeTVShows();

			return {
				results: {
					tv: tvResults,
				},
			};
		}
	);
  eleventyConfig.on(
		"eleventy.after",
		async ({ dir, results, runMode, outputMode }) => {
			// Run me after the build ends
      console.log("After Build", dir, runMode, outputMode);
      console.log("Build Complete");
		}
	);

	//
	// Install Plugins
	//
  // This plugin isn't doing anything.
  eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(require("@rknightuk/eleventy-plugin-post-graph"), {
		boxColor: "var(--background-muted)",
		highlightColor: "var(--accent)",
		textColor: "var(--foreground)",
	});

	eleventyConfig.addPlugin(require("./lib/helpers/screenshot"));

	eleventyConfig.addPlugin(
		require("@photogabble/eleventy-plugin-interlinker"),
		{
			defaultLayout: "layouts/embed.liquid",
		}
	);

	eleventyConfig.addPlugin(
		require("@photogabble/eleventy-plugin-font-subsetting"),
		{
			srcFiles: [
				`./public/fonts/caneladeck-bold-webfont.woff2`,
				`./public/fonts/caneladeck-bolditalic-webfont.woff2`,
        `./public/fonts/caneladeck-thin-webfont.woff2`,
        `./public/fonts/caneladeck-regularitalic-webfont.woff2`,
        `./public/fonts/caneladeck-regular-trial-webfont.woff2`,
			],
			dist: "./src/fonts",
			enabled: process.env.ELEVENTY_ENV !== "production",
			cache: new ObjectCache("font-subsetting"),
		}
	);

	eleventyConfig.addPlugin(
		require("@photogabble/eleventy-plugin-tag-normaliser"),
		{
			ignore: ["PHP", "JavaScript", "DOScember"],
			similar: {
				"Game Development": ["GameDev"],
				"Retro Computing": ["RetroComputing"],
				"Node JS": ["Node"],
				"365 Day Project": ["365DayProject"],
        "action": ["Action"],
        "WildStorm": ["WildStorm", "wildstorm", "Wildstorm"],
			},
			slugify,
		}
	);

	eleventyConfig.addPlugin(require("eleventy-plugin-postcss"));

  // Ignore the problematic files directly
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.ignores.add("src/content/templates/*.md");

	const numberFormat = new Intl.NumberFormat("en-GB");

	eleventyConfig.addPlugin(
		require("@photogabble/eleventy-plugin-word-stats"),
		{
			output: (stats) => {
				const words = numberFormat.format(stats.words);
				return {
					words: stats.words,
					time: stats.text,
					text: `~${words} words, about a ${stats.text}`,
				};
			},
		}
	);

	eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));

	eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"), {
		init: ({ Prism }) => {
			require("prismjs/plugins/treeview/prism-treeview.js");
			require("prismjs/components/prism-clike");
			require("prismjs/components/prism-markup");
			require("prismjs/components/prism-markup-templating");
			require("prismjs/components/prism-ini");
			require("prismjs/components/prism-css");
			require("prismjs/components/prism-bash");
			require("prismjs/components/prism-powershell");
			require("prismjs/components/prism-yaml");
			require("prismjs/components/prism-javascript");
			require("prismjs/components/prism-sql");
			require("prismjs/components/prism-twig");
			require("prismjs/components/prism-php");
			require("prismjs/components/prism-php-extras");
			require("prismjs/components/prism-markdown");
			require("prismjs/components/prism-basic");
			require("prismjs/components/prism-go");
			require("prismjs/components/prism-regex");
		},
	});

	//
	// Filters, Collections, Transformers and Shortcodes
	//

	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});


  Object.keys(asyncFilters).forEach((filterName) => {
    eleventyConfig.addAsyncFilter(filterName, asyncFilters[filterName]);
  });

	for (const [name, collection] of Object.entries(
		collections(eleventyConfig)
	)) {
		eleventyConfig.addCollection(name, collection);
	}

/*
  eleventyConfig.addCollection('cleantags', async function(collectionApi) {
    let starter = collectionApi.getAll();
    let starterTags = new Set();
    starter.forEach(item => {
      if (item.data.tags && item.data.tags.length > 0){
        starterTags.add(...item.data.tags)
      }
    });

    console.log('this collections', eleventyConfig.collections)

    let alphabeticalArray = Array.from(starterTags).sort();
    let cleanCollections = {};
    alphabeticalArray.forEach(tag => {
      //eleventyConfig.addCollection(tag.toLowerCase(), (collectionApi) => {
        let results = starter.filter((item) => {
          if (item.data.tags && item.data.tags.length > 0){
            let lowerTags = item.data.tags.map(tag => tag.toLowerCase())
            return lowerTags.includes(tag.toLowerCase())
          } else {
            return false;
          }

        })
        cleanCollections[tag.toLowerCase()] = {
          slug: tag.toLowerCase(),
          title: tag.toLowerCase(),
          pageNumber: 1,
          totalPages: 1,
          items: results
        };
        //return results;
      //});
    })
    // console.log('eleventyConfig', eleventyConfig.collections)
    console.log('starterTags', cleanCollections)
    return cleanCollections;
  });
*/
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName]);
	});

	Object.keys(shortcodes).forEach((shortCodeName) => {
		eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
	});

	// Webmanifest stuff

  /**
   * removing this from active build process for now
   * as canvas and sharp have some sort of weird error.
   *
	var sharp = require("sharp");
	var promiseSet = [];
	[
		["favicon-16x16.png", [16, 16]],
		["favicon-32x32.png", [32, 32]],
		["android-chrome-192x192.png", [192, 192]],
		["android-chrome-512x512.png", [512, 512]],
		["apple-touch-icon.png", [180, 180]],
		["mstile-150x150.png", [150, 150]],
	].forEach((imageTarget) => {
		if (!fs.existsSync(`./public/favicon/${imageTarget[0]}`)) {
			promiseSet.push(
				new Promise((resolve, reject) => {
					sharp("./public/favicon/favicon-square-close.png")
						.resize(...imageTarget[1])
						.png()
						.toFile(`./public/favicon/${imageTarget[0]}`)
						.then((data) => {
							resolve(data);
						})
						.catch((err) => {
							console.log("favicon maker", err);
							reject(err);
						});
				})
			);
		}
	});
 */

  // Dev Time Build Ignores
  if (process.env.IS_LOCAL === "true"){
    eleventyConfig.ignores.add("src/content/amplify/2023**");
    eleventyConfig.ignores.add("src/content/amplify/2024-01**");
    eleventyConfig.ignores.add("src/content/amplify/2024-02**");
    eleventyConfig.ignores.add("src/content/amplify/2024-03**");
    eleventyConfig.ignores.add("src/content/amplify/2024-03**");
    eleventyConfig.ignores.add("src/content/amplify/2024-04**");
    eleventyConfig.ignores.add("src/content/amplify/2024-05**");
    eleventyConfig.ignores.add("src/content/amplify/2024-06**");
    eleventyConfig.ignores.add("src/content/amplify/2024-07**");
    eleventyConfig.ignores.add("src/content/amplify/2024-08**");
    eleventyConfig.ignores.add("src/content/amplify/2024-09**");
  }

  // Ignore the folder obsidian
  eleventyConfig.ignores.add("./src/content/posts/.obsidian");
  eleventyConfig.ignores.add("./src/content/.obsidian/");

	//
	// Pass through
	//

	eleventyConfig.addPassthroughCopy({
		"public/favicon": "/",
		"public/files": "files",
		"public/img": "img",
    "public/scripts": "scripts",
		_redirects: "_redirects",
		"public/og-image": "img/og-image",
		"public/main.js": "main.js",
		"public/htmx.min.js": "htmx.min.js",
		CNAME: "CNAME",
		".nojekyll": ".nojekyll",
	});

	//
	// Markdown-It && Plugins
	//

	eleventyConfig.setLibrary("md", require("./lib/helpers/markdown"));

  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    // Run me after the build ends
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };

};
