---
title: Google uses it long straw to drink your milkshake
date: 2026-04-28
source:
isBasedOn:
link:
tags:
  - Google
  - photos
  - delete
  - bulk
---

[Google is set to use your photos to train it's AI](https://www.forbes.com/sites/zakdoffman/2026/04/20/google-starts-scanning-all-your-photos-as-new-update-goes-live/). As ravenous information thieves, they are counting on you to leave your photos in place. In turn they will take their long straw and [drink your milkshake](https://youtu.be/s_hFTR6qyEo?si=_LsoUNud1_GebURN). You can stop them from using your photos of your children and prevent them from having them forever. 

Except bulk deletion is really time consuming. Below is a script you can copy and paste into the developer's console ( cmd + option + i). What it does, as you scroll through your photos, it will select all of them that are visible on the screen. 

I personally have over 64,000 photos. I have been deleting in 5k batches at a time. It takes about 5 minutes to scroll that many photos and select them. The real drawback is having to look through the photos. Stopping too long will end the script. You can fire the script and again by hitting the up arrow and enter to execute it.

Be sure to click on the trash button. It will take a few seconds before you see it going through and deleting the photos.

```javascript 
(async () => {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  
  // Find all unchecked photo checkboxes
  const getUnchecked = () => document.querySelectorAll(
    'div[role="checkbox"][aria-checked="false"][aria-label^="Photo"], ' +
    'div[role="checkbox"][aria-checked="false"][aria-label^="Video"]'
  );
  
  let total = 0;
  let lastHeight = 0;
  let stableCount = 0;
  
  while (true) {
    const unchecked = getUnchecked();
    
    // Click each unchecked checkbox
    for (const cb of unchecked) {
      cb.click();
      total++;
      // Small delay to avoid overwhelming the UI
      if (total % 50 === 0) await delay(100);
    }
    
    console.log(`Selected so far: ${total}`);
    
    // Scroll down to load more photos
    window.scrollTo(0, document.body.scrollHeight);
    await delay(800);
    
    // Check if we've reached the bottom (page height stopped changing)
    const currentHeight = document.body.scrollHeight;
    if (currentHeight === lastHeight && getUnchecked().length === 0) {
      stableCount++;
      if (stableCount >= 3) break; // Confirm we're really done
    } else {
      stableCount = 0;
    }
    lastHeight = currentHeight;
  }
  
  console.log(`✅ Done. Total selected: ${total}`);
    })();
```

Its important to take the view that Google and the rest of the rotten lot are in the business of extracting as much data out of you as possible. They are strip miners. When you use any of their "free" products, you are performing free labor. Take your power back. 