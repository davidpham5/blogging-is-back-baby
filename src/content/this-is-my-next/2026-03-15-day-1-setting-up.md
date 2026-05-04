---
title: "Day 1: Setting Up This Is My Next"
date: 2026-03-15
tags:
  - timn
  - meta
  - eleventy
todos:
  - text: Design the section concept
    done: true
  - text: Wire up the timn content type
    done: true
    subtasks:
      - { text: "Create 11tydata.js", done: true }
      - { text: "Add to collections.js", done: true }
  - text: Build the post layout with TODO section
    done: true
  - text: Set up VS Code Dark+ code highlighting
    done: true
  - text: Write the first real post
    done: false
---

This section is called **This Is My Next** — a dev log inspired by [Fight With Tools](https://fightwithtools.dev/). Each entry is a timestamped snapshot of what I'm building, what I'm stuck on, and what I'm figuring out.

The idea: short, honest notes. Not polished essays. Just progress.

## What I Built Today

The whole infrastructure for this section in one sitting:

- A new `timn` content type with its own layout
- A TODO checklist component that reads from frontmatter
- VS Code Dark+ syntax highlighting scoped to this section only
- A Bluesky share button on every post
- An archive page at `/this-is-my-next/`

Here's the 11tydata.js that powers the content type:

```javascript
module.exports = {
  layout: 'layouts/page-timn-post.njk',
  contentType: 'timn',
  excludeFromFeed: false,
  eleventyComputed: {
    permalink: (data) => `/this-is-my-next/${data.page.fileSlug}/`,
  },
};
```

And the TODO frontmatter format looks like this:

```yaml
todos:
  - text: Set up monorepo
    done: true
    subtasks:
      - { text: "Pick package manager", done: true }
  - text: Write first post
    done: false
```

## Next Up

Collect and read links as recommend by Aram, and share as a post.
