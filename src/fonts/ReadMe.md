## why isn't my font rendering?
If you're having trouble getting your font to render, make sure you've included the font file in the `src/fonts` directory. There are a few files that are required for the font to render correctly. These files include:
- `.elevanty.js`
- `_fonts.css`
- `main.css`

## Getting started
Use font squirrel to convert a legally obtained font file to a web font. Once you have the web font files, place them in the `src/fonts` directory.

On build, the plugin, `@photogabble/eleventy-plugin-font-subsetting` in `.elevanty.js` is used to subset the font files. This plugin will copy the font files to `_site/fonts` directory.

The css file `_fonts.css` is used to load the font files, via `@font-face` decorator. This file is included in the `main.css` file.