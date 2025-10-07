async function getPhotos () {
  const url = process.env.CLOUNDINARY_CLOUD_URL;
  if (!url) {
    console.log('Cloudinary URL not set in environment variables');
    return [];
  }

  console.log('Fetching photos from Cloudinary...');

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log({data});
    return data;
  } catch {
    console.log('Error fetching photos from Cloudinary');
  } finally {
    console.log('Fetch attempt finished');
  }
}
getPhotos();
module.exports = {
  // Cloudinary configuration
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudPhotos: getPhotos(),
  // Photo collection
  collection: [
    {
      id: 'sample-1',
      cloudinaryId: 'sample', // Replace with your actual Cloudinary public IDs
      title: 'Urban Landscape',
      description: 'A stunning view of the city skyline during the golden hour, capturing the interplay of natural light and urban architecture.',
      tags: ['urban', 'landscape', 'golden-hour', 'architecture'],
      dateCreated: '2024-01-15',
      location: 'Downtown',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/8, 1/125s, ISO 100',
      featured: true,
      printSizes: {
        '8x10': { price: 25, available: true },
        '11x14': { price: 35, available: true },
        '16x20': { price: 50, available: true },
        '20x24': { price: 75, available: false }
      }
    },
    {
      id: 'sample-2',
      cloudinaryId: 'sample_2',
      title: 'Nature Close-up',
      description: 'An intimate macro shot revealing the intricate details and textures found in nature.',
      tags: ['macro', 'nature', 'detail', 'texture'],
      dateCreated: '2024-02-03',
      location: 'Local Park',
      camera: 'Canon EOS R5',
      lens: '100mm f/2.8 Macro',
      settings: 'f/5.6, 1/250s, ISO 200',
      featured: false,
      printSizes: {
        '8x10': { price: 25, available: true },
        '11x14': { price: 35, available: true },
        '16x20': { price: 50, available: true }
      }
    }
  ],

  // Print options and pricing
  printOptions: {
    sizes: [
      { name: '8x10', price: 25, description: 'Perfect for desks and small frames' },
      { name: '11x14', price: 35, description: 'Great for wall displays' },
      { name: '16x20', price: 50, description: 'Statement piece size' },
      { name: '20x24', price: 75, description: 'Large format for galleries' }
    ],
    materials: [
      { name: 'Lustre Paper', description: 'Semi-gloss finish with rich colors', priceMultiplier: 1.0 },
      { name: 'Matte Paper', description: 'Non-reflective finish, gallery quality', priceMultiplier: 1.2 },
      { name: 'Canvas', description: 'Gallery-wrapped canvas print', priceMultiplier: 1.8 },
      { name: 'Metal', description: 'Aluminum print with vibrant colors', priceMultiplier: 2.5 }
    ]
  },

  // Categories for organization
  categories: [
    { id: 'all', name: 'All Photos', description: 'Complete collection' },
    { id: 'landscape', name: 'Landscapes', description: 'Natural and urban landscapes' },
    { id: 'macro', name: 'Macro', description: 'Close-up detail photography' },
    { id: 'portrait', name: 'Portraits', description: 'People and character studies' },
    { id: 'street', name: 'Street', description: 'Urban life and candid moments' },
    { id: 'nature', name: 'Nature', description: 'Wildlife and natural scenes' }
  ],

  // Helper functions
  getFeaturedPhotos() {
    return this.collection.filter(photo => photo.featured);
  },

  getPhotosByCategory(category) {
    if (category === 'all') return this.collection;
    return this.collection.filter(photo => photo.tags.includes(category));
  },

  getPhotoById(id) {
    return this.collection.find(photo => photo.id === id);
  },

  generateCloudinaryUrl(publicId, transformation = '') {
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;
    return transformation ? `${baseUrl}/${transformation}/${publicId}` : `${baseUrl}/${publicId}`;
  }
};
