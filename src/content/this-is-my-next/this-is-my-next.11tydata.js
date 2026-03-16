module.exports = {
  layout: 'layouts/page-timn-post.njk',
  contentType: 'timn',
  excludeFromFeed: false,
  eleventyComputed: {
    permalink: (data) => `/this-is-my-next/${data.page.fileSlug}/`,
  },
};
