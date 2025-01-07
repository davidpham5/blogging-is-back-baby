---
title: Astro as a do everything framework
date: 2025-01-07
source: Fireship
isBasedOn: Astro just Launched.... Could it be the ultimate web framework?
link: https://www.youtube.com/watch?v=gxBkghlglTg
tags:
  - astro
  - fireship
  - TIL
---
<div class="embed-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/gxBkghlglTg?si=yT2bPM7eSvlECAKH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

- Client-side routing like in NextJS is something not done in Astro and instead routing is handled by the sever.
- function components are treated as static `html` and attributes on those components are like AngularJS directives. Those directives tells the component when to render
- Component can hydrate (render the html partial) based on 3 states:
	1. `client:load` === render immediately
	2. `client:idle` === chill until ready
	3. `client:visible` === render when in viewport

Technique is called *island architecture*, where you selectively swap/hydrate out html without render cycles.

Can do dynamic routing like NextJS via getStaticProps or full Server-Side Rendering (SSR) in nodeJS.

