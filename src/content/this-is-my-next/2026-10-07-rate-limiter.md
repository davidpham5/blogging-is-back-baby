---
title: How to design a rate limiter
date: 2026-10-07
source: System Design Interview vol  1 by bytebytego
isBasedOn:
link:
tags:
  - system
  - interview
---
![image|700x655](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image.png)

Token Bucket algo takes two parameters
1) Bucket size: max number of tokens allowed in the bucket.
2) Refill rate: number of tokens put into the second per second

How many buckets do we need? It depends!
- Different buckets for different API endpoints
