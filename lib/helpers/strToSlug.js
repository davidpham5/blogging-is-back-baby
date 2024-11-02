const slugify = require('slugify');

/**
 * @param string {string}
 * @returns {string}
 */
module.exports = (str) => {
    if (typeof str !== "string") {
      throw new Error("slugify: string argument expected");
    }
    return slugify(str, {
      lower: true,
      replacement: '-',
      remove: /[&,+()$~%.'":*?!<>{}#/]/g,
    })
};
