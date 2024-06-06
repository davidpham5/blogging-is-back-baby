module.exports = {
  layout: "layouts/page.njk",
  contentType: 'sourdoughs',
  permalinkBase: 'sourdoughs',
  language: null,
  status: null,
  eleventyComputed: {
    permalink(data) {
      return `sourdoughs/${this.slugify(data.title)}/`
    }
  }
};
