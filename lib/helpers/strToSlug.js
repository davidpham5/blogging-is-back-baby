const slugify = require('slugify');

/**
 * @param string {string}
 * @returns {string}
 */
module.exports = (string) => {
    if (typeof string !== "string") {
      throw new Error("slugify: string argument expected");
    }
    return slugify(string, {
      lower: true,
      replacement: '-',
      remove: /[&,+()$~%.'":*?!<>{}#/]/g,
    })
};
