---
title: HTMX
tags:
  - htmx
  - overeview
  - alexander
  - petros
  - exploring
  - TIL
featured: false
---

I am exploring `htmx`. I learned Alexander Petros was a former colleague of mine and he is now a core developer for `htmx`. We've never met, but we correspond on slack. I reached out to him after watching his [talk at Big Sky Con](https://www.youtube.com/embed/inRB6ull5WQ?si=pRAHAF0hM5z3UZ1w) and shared with him my admiration for his work.

<iframe width="720" height="460" src="https://www.youtube.com/embed/inRB6ull5WQ?si=pRAHAF0hM5z3UZ1w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Aram Zucker-Sharff](https://aramzs.xyz/) did a little fun project, [Song Obsessed](https://songobsessed.com/) using `htmx`. He mentioned to me that he wanted to explore `htmx` and the project was a cool fun way to understanding it.

I am reading through [Hypermedia Systems](https://www.lulu.com/shop/deniz-ak%C5%9Fim%C5%9Fek-and-adam-stepinski-and-carson-gross/hypermedia-systems/ebook/product-jenyj66.html?page=1&pageSize=4) by Carson Gross, Afam Stepinkski, Deniz Aksimsek and Wm Talcott. I listened to Carson Gross on Syntax.fm [here](https://syntax.fm/show/734/htmx-web-apps-with-carson-gross) as he talked about building `htmx`. As I'm collecting notes on it, I am excited to be learning some cool stuff. The web doesn't seem so dead after all.

### Goals
- Rebuild sarajstreeter.com in `htmx`
- phase out `nextjs` and `react` for `htmx`
- it's a simple static one page site. Nextjs is overkill.

### TIL December 2024
- two attributes that enables htmx: 
	- `hx-get`
	- `hx-swap`
```html
<button hx-get=/users hx-swap=outerHTML>View Users</button>
```

- `hx-swap=outerHTML` means "replace outerHTML which means the button" or other words, replace button with `ul` list
