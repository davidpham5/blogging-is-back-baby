const ObjectCache = require("../../lib/helpers/cache");
const chalk = require("chalk");

const cache = new ObjectCache(`raindrop`);

async function getRecentBookmarks() {
  // Disable cache for dev testing
  // if (cache.has('recent-bookmarks')) return cache.get('recent-bookmarks');

  const token = process.env.RAINDROP_TOKEN;
  const clientId = process.env.RAINDROP_CLIENT_ID;
  const clientSecret = process.env.RAINDROP_CLIENT_SECRET;

  if (!token) {
    console.log(chalk.yellow('[raindrop]'), 'No RAINDROP_TOKEN found, returning empty array');
    return [];
  }

  console.log(chalk.blue('[raindrop]'), 'Fetching recent bookmarks from Raindrop.io...');

  try {
    // Prepare headers with authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Add client credentials if available
    if (clientId && clientSecret) {
      headers['X-Client-ID'] = clientId;
      headers['X-Client-Secret'] = clientSecret;
    }

    // Get recent bookmarks from all collections, sorted by creation date descending
    const response = await fetch('https://api.raindrop.io/rest/v1/raindrops/0?sort=-created&perpage=10', {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Raindrop API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log the raw response for debugging
    // console.log(chalk.green('[raindrop]'), 'Raindrop Data Response:');
    // console.log(JSON.stringify(data, null, 2));

    if (data?.items) {
      // Transform raindrop bookmarks into turbo link format
      const articles = data.items.map(item => {
        console.log({item});
        return {
          id: item._id,
          title: item.title,
          summary: item.excerpt || '',
          image_url: item.cover || null,
          note: item.note || '',
          source_url: item.link,
          raindrop_url: `https://raindrop.io/my/0/item/${item._id}`,
          author: item.domain || '',
          site_name: item.domain || '',
          created_at: item.created,
          updated_at: item.lastUpdate,
          date: item.created,
          data: {
            contentType: 'turbo',
            tags: ['raindrop', 'saved', 'turbo link']
          }
        };
      });

      // Log the transformed articles
      // console.log(chalk.green('[raindrop]'), 'Transformed bookmarks:');
      // console.log(JSON.stringify(articles, null, 2));

      // Cache for 30 minutes
      cache.set('recent-bookmarks', articles, 1800);
      return articles;
    }
  } catch (error) {
    console.error(chalk.red('[raindrop]'), 'Error fetching bookmarks:', error.message);
    return [];
  }

  return [];
}

module.exports = async function () {
  return {
    articles: await getRecentBookmarks()
  };
};
