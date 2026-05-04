---
title: Needlessly complicated
date: 2025-04-22
source: David Chico Pham
isBasedOn: Astro
link: https://docs.astro.build/en/concepts/islands/
tags:
  - astro
  - htmx
---
I had a correspondence with Alex Petros, a core engineer on HTMX. We had some overlap when he was an engineer at the Washington Post. He said something that has stuck with me for several months. Building websites is needlessly complicated. 

Most of what is on a page is largely static, but we insist on cutting edge frameworks that can scale to unicorn level performance. We are still just building HTML, CSS. The JavaScript is too much, in my view, to justify picking frameworks such as NextJS, Remix, etc.

I am exploring Astro and so far it has struck a great balance in it's partial hydration or architectural islands. In a sea of static contents, a section is marked for dynamic updates. It can sometimes feel like, it can't be this simple -- we must prove our value at work by abstracting further these tools.

It's a little bit of bullshit, and fooling ourselves. 