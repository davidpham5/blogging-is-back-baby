const ObjectCache = require("../../lib/helpers/cache");
const chalk = require("chalk");

const cache = new ObjectCache(`instapaper`);

async function getLikedBookmarks() {
  // Disable cache for dev testing
  // if (cache.has('liked-bookmarks')) return cache.get('liked-bookmarks');

  const username = process.env.INSTAPAPER_USERNAME;
  const password = process.env.INSTAPAPER_PASSWORD;

  if (!username || !password) {
    console.log(chalk.yellow('[instapaper]'), 'No INSTAPAPER_USERNAME or INSTAPAPER_PASSWORD found, returning empty array');
    return [];
  }

  console.log(chalk.blue('[instapaper]'), 'Fetching liked bookmarks from Instapaper...');

  try {
    // Instapaper API uses simple authentication
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const headers = {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Get liked bookmarks - Instapaper API endpoint for starred/liked items
    const response = await fetch('https://www.instapaper.com/api/1/bookmarks/list', {
      method: 'POST',
      headers,
      body: new URLSearchParams({
        limit: '150',
        folder_id: 'starred' // Get starred/liked items
      })
    });

    if (!response.ok) {
      throw new Error(`Instapaper API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log the raw response for debugging
    // console.log(chalk.green('[instapaper]'), 'Instapaper Data Response:');
    // console.log(JSON.stringify(data, null, 2));

    if (Array.isArray(data)) {
      // Instapaper returns an array where first item is user info, rest are bookmarks
      const bookmarks = data.slice(1).filter(item => item.type === 'bookmark');

      // Transform instapaper bookmarks into turbo link format
      const articles = bookmarks.map(item => {
        return {
          id: `instapaper-${item.bookmark_id}`,
          title: item.title,
          summary: item.description || '',
          image_url: null, // Instapaper doesn't provide cover images in API
          note: item.private_source || '',
          source_url: item.url,
          instapaper_url: `https://www.instapaper.com/read/${item.bookmark_id}`,
          site_name: item.url ? new URL(item.url).hostname.replace('www.', '') : '',
          created_at: new Date(item.time * 1000).toISOString(), // Convert Unix timestamp to ISO
          updated_at: new Date(item.time * 1000).toISOString(),
          date: new Date(item.time * 1000).toISOString(),
          data: {
            contentType: 'turbo',
            tags: ['instapaper', 'turbo link', 'liked'],
          }
        };
      });

      // Log the transformed articles
      // console.log(chalk.green('[instapaper]'), 'Transformed bookmarks:');
      // console.log(JSON.stringify(articles, null, 2));

      // Cache for 30 minutes
      cache.set('liked-bookmarks', articles, 100);

      // Debug output - highly visible
      console.log(chalk.bgMagenta.white('\n========================================'));
      console.log(chalk.bgMagenta.white('   INSTAPAPER DEBUG OUTPUT'));
      console.log(chalk.bgMagenta.white('========================================'));
      console.log(chalk.magenta(`Total bookmarks fetched: ${articles.length}`));
      if (articles.length > 0) {
        console.log(chalk.magenta('\nFirst 3 articles:'));
        articles.slice(0, 3).forEach((article, idx) => {
          console.log(chalk.cyan(`  ${idx + 1}. ${article.title}`));
          console.log(chalk.gray(`     URL: ${article.source_url}`));
          console.log(chalk.gray(`     Date: ${article.date}`));
        });
      }
      console.log(chalk.bgMagenta.white('========================================\n'));

      return articles;
    }
  } catch (error) {
    console.error(chalk.red('[instapaper]'), 'Error fetching bookmarks:', error.message);
    return [];
  }

  return [];
}

module.exports = async function () {
  return {
    articles: await getLikedBookmarks()
  };
};
