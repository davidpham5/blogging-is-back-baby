const ObjectCache = require("../../lib/helpers/cache");
const chalk = require("chalk");

const cache = new ObjectCache(`readwise`);

async function getRecentSavedArticles() {
  // Disable cache for dev testing
  // if (cache.has('recent-highlights')) return cache.get('recent-highlights');

  const token = process.env.READWISE_TOKEN;
  if (!token) {
    console.log(chalk.yellow('[readwise]'), 'No READWISE_TOKEN found, returning empty array');
    return [];
  }

  console.log(chalk.blue('[readwise]'), 'Fetching recent saved articles from Readwise...');

  try {
    const response = await fetch('https://readwise.io/api/v3/list/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Readwise API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log the raw response for debugging
    // console.log(chalk.green('[readwise]'), 'Readwise Data Response:');
    // console.log(JSON.stringify(data, null, 2));

    if (data?.results) {
      // Transform readwise saved articles into turbo link format
      const articles = data.results.slice(0, 10).map(article => {
        // console.log({article});
        return {
          id: article.id,
          title: article.title,
          summary: article.summary || '',
          image_url: article.image_url || null,
          note: article.notes || '',
          source_url: article.source_url,
          readwise_url: article.url,
          author: article.author || '',
          site_name: article.site_name || '',
          created_at: article.created_at,
          updated_at: article.updated_at,
          date: article.saved_at || article.updated_at,
          data: {
            contentType: 'turbo',
            tags: ['readwise', 'saved', 'turbo link']
          }
        };
      });

      // Log the transformed articles
      // console.log(chalk.green('[readwise]'), 'Transformed saved articles:');
      // console.log(JSON.stringify(articles, null, 2));

      // Cache for 30 minutes
      cache.set('recent-articles', articles, 1800);
      return articles;
    }
  } catch (error) {
    console.error(chalk.red('[readwise]'), 'Error fetching articles:', error.message);
    return [];
  }

  return [];
}

module.exports = async function () {
  return {
    articles: await getRecentSavedArticles()
  };
};
