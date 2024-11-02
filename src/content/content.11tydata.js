const {getChanges} = require("../../lib/helpers/get-git-changes");
const {ogImageFromSlug} = require('../../lib/filters');
const slugify = require("../../lib/helpers/strToSlug");

module.exports = {
  featured: false,
  draft: false,
  excludeFromFeed: false,
  layout: 'layouts/page-post.njk',
  growthStage: 'seedling', // seedling, budding, evergreen
  contentType: 'thought', // thought, noteworthy, essay, tutorial, project
  folder: ['writing'],
  eleventyComputed: {
    changes: data => getChanges(data),
    permalink(data) {
      const title = data.title || "default-title"; // Provide a default title if data.title is undefined
      return `/posts/${slugify(String(title))}/`; // Ensure the title is a string
    },
    // ogImageHref: (data) => ogImageFromSlug(slugify(data.title)),
    ogImageHref: (data) => {
      const title = data.title || "default-title"; // Provide a default title if data.title is undefined
      return `/img/og-images/${slugify(String(title))}.png`; // Ensure the title is a string
    },
  }
};
