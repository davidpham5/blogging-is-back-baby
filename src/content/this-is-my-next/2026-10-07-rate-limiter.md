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

## Token Bucket algo takes two parameters
1) Bucket size: max number of tokens allowed in the bucket.
2) Refill rate: number of tokens put into the second per second

How many buckets do we need? It depends!
- Different buckets for different API endpoints

## Leaky Bucket Algorithm


![leaky bucket algorithm](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/leaky-bucket-algorithm.png)

Leaky bucket takes 2 parameters
1) bucket size: it is equal to the queue size. The queue holds the requests to be processed at a fixed rate
2) outflow rate: it defines how many requests can be processed at a fixed rate, usually in seconds

Shopify uses this algorithm

- Memory efficient given the limited queue size
- If you have a stable outflow rate, the fixed rate works well 

But
- burst of traffic fills up the queue with old requests, and if they are not processed in time, recent requests will be rate limited
- just 2 parameters makes tuning and calibrating more difficult. 