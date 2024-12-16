// let plugins = [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('autoprefixer'),
// ];

// if (process.env.ELEVENTY_ENV === 'production') {
//     // These all take time to process and are best done in production only.
//     plugins = [
//       ...plugins,
//         require('@fullhuman/postcss-purgecss')({
//             content: [
//                 './**/*.html',
//                 './**/*.njk',
//                 './**/*.js',
//                 './**/*.md',
//             ],
//             safelist: [
//                 /^theme-/
//             ]
//         }),
//         require('postcss-minify'),
//     ];
// }

// export default {
//     plugins
// };

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
