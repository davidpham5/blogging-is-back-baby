module.exports = {
  layout: "layouts/page.njk",
  contentType: 'sourdoughs',
  permalinkBase: 'bread',
  language: null,
  status: null,
  eleventyComputed: {
    permalink(data) {
      return `bread/${this.slugify(data.title)}/`
    }
  }
};
