const chalk = require("chalk");

module.exports = async function () {
  console.log(chalk.blue('[turboLinks]'), 'Aggregating turbo links from multiple sources...');

  // This function runs after raindrop.js and instapaper.js have been loaded
  // We can access their data through this.raindrop and this.instapaper
  const raindropArticles = this.raindrop?.articles || [];
  const instapaperArticles = this.instapaper?.articles || [];

  // Combine both sources
  const allArticles = [...raindropArticles, ...instapaperArticles];

  // Sort by date (newest first)
  allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Highly visible debug output
  console.log(chalk.bgCyan.black('\n========================================'));
  console.log(chalk.bgCyan.black('   TURBO LINKS AGGREGATOR'));
  console.log(chalk.bgCyan.black('========================================'));
  console.log(chalk.cyan(`📊 Raindrop articles: ${raindropArticles.length}`));
  console.log(chalk.yellow(`📊 Instapaper articles: ${instapaperArticles.length}`));
  console.log(chalk.green(`📊 Total combined: ${allArticles.length}`));

  if (allArticles.length > 0) {
    console.log(chalk.cyan('\n🔝 Most recent 5 articles:'));
    allArticles.slice(0, 5).forEach((article, idx) => {
      const source = article.raindrop_url ? '🔵 Raindrop' : '🟡 Instapaper';
      console.log(chalk.white(`  ${idx + 1}. ${source} - ${article.title}`));
      console.log(chalk.gray(`     ${new Date(article.date).toLocaleDateString()}`));
    });
  }
  console.log(chalk.bgCyan.black('========================================\n'));

  return {
    articles: allArticles,
    sources: {
      raindrop: raindropArticles.length,
      instapaper: instapaperArticles.length,
      total: allArticles.length
    }
  };
};
