# Photo Gallery Setup Instructions

This document explains how to configure and use the photo gallery with print purchasing functionality.

## Overview

The photo gallery feature allows you to:
- Display photos in an organized grid layout
- Filter photos by category (landscape, macro, portrait, etc.)
- View photos in a detailed modal with metadata
- Offer prints for purchase with multiple size and material options
- Calculate pricing dynamically based on size and material choices

## Files Created

- `src/photos.njk` - Main photo gallery page
- `src/_data/photos.js` - Photo data and configuration
- Updated `src/_includes/components/jumbo-nav.njk` - Added navigation link

## Setup Instructions

### 1. Cloudinary Configuration

1. Sign up for a free Cloudinary account at https://cloudinary.com
2. Find your cloud name in your Cloudinary dashboard
3. Update the `cloudName` in `src/_data/photos.js`:

```javascript
cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'your-actual-cloud-name',
```

4. Optionally, set the environment variable:
```bash
export CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### 2. Adding Photos

#### Upload to Cloudinary
1. Upload your photos to Cloudinary
2. Note the "Public ID" for each photo (e.g., "sunset-landscape", "macro-flower")

#### Update Photos Data
Edit `src/_data/photos.js` and add your photos to the `collection` array:

```javascript
{
  id: 'unique-photo-id',
  cloudinaryId: 'your-cloudinary-public-id',
  title: 'Photo Title',
  description: 'Detailed description of the photo',
  tags: ['landscape', 'nature', 'golden-hour'], // Used for filtering
  dateCreated: '2024-01-15',
  location: 'Location where photo was taken',
  camera: 'Camera model',
  lens: 'Lens used',
  settings: 'Camera settings (f-stop, shutter, ISO)',
  featured: false, // Set to true for featured photos
  printSizes: {
    '8x10': { price: 25, available: true },
    '11x14': { price: 35, available: true },
    '16x20': { price: 50, available: true },
    '20x24': { price: 75, available: false }
  }
}
```

### 3. Customizing Print Options

#### Sizes and Pricing
Edit the `printOptions.sizes` array in `src/_data/photos.js`:

```javascript
sizes: [
  { name: '8x10', price: 25, description: 'Perfect for desks and small frames' },
  { name: '11x14', price: 35, description: 'Great for wall displays' },
  // Add more sizes as needed
]
```

#### Materials
Edit the `printOptions.materials` array:

```javascript
materials: [
  { name: 'Lustre Paper', description: 'Semi-gloss finish', priceMultiplier: 1.0 },
  { name: 'Canvas', description: 'Gallery-wrapped canvas', priceMultiplier: 1.8 },
  // Add more materials as needed
]
```

### 4. Categories and Filtering

Add or modify categories in `src/_data/photos.js`:

```javascript
categories: [
  { id: 'all', name: 'All Photos', description: 'Complete collection' },
  { id: 'landscape', name: 'Landscapes', description: 'Natural and urban landscapes' },
  { id: 'portrait', name: 'Portraits', description: 'People and character studies' },
  // Add your categories
]
```

### 5. Payment Integration

The current implementation uses a simple prompt-based flow. To integrate with a real payment processor:

#### For Stripe:
1. Install Stripe: `npm install stripe`
2. Add your Stripe keys to environment variables
3. Replace the `initiatePurchase()` function in `src/photos.njk` with Stripe Checkout integration

#### For PayPal:
1. Use PayPal's JavaScript SDK
2. Replace the purchase flow with PayPal buttons

### 6. Testing

1. Build the site: `npm run build:dev`
2. Visit `/photos` to view the gallery
3. Test filtering by clicking category buttons
4. Click on photos to view the modal
5. Test the purchase flow (currently shows a prompt)

## Customization

### Styling
The CSS is embedded in `src/photos.njk`. You can:
- Modify colors by changing CSS custom properties
- Adjust grid layout by changing `grid-template-columns`
- Customize modal appearance

### Cloudinary Transformations
The gallery uses these Cloudinary transformations:
- Thumbnails: `c_fill,w_400,h_400,q_auto`
- Full size: `c_limit,w_1200,q_auto`

You can modify these in the JavaScript functions for different image sizes or effects.

## Production Considerations

1. **Environment Variables**: Set `CLOUDINARY_CLOUD_NAME` in production
2. **Payment Processing**: Integrate with Stripe, PayPal, or other payment processors
3. **Order Management**: Add a backend system to handle orders and fulfillment
4. **Email Notifications**: Set up automated email confirmation for orders
5. **Inventory Management**: Track print availability and manage stock

## Support

- Cloudinary documentation: https://cloudinary.com/documentation
- Stripe documentation: https://stripe.com/docs
- PayPal developer docs: https://developer.paypal.com/

The photo gallery is now ready to use! Update your photos and configuration, then build and deploy your site.