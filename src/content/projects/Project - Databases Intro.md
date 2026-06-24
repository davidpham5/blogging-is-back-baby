---
title: Intro to Databases by Brian Holt
date: 2026-06-24
tags:
  - databases
  - frontend
  - masters
  - brain
  - holt
  - intervention
---
[Introduction - Complete Intro to Databases, v2 | Frontend Masters](https://frontendmasters.com/courses/databases-v2/introduction/)
A complete survey of databases.
Pattern matching: I have this shape of problem and I will use this database to solve for it.
Not a deep dive.

Guide is open source: [Complete Intro to Databases v2](https://databases-v2.holt.courses/)

Four DB:
- MongoDB
- Postgress
- Neo4j
- Redis

Really stable technologies.

DB Admin from old suffer from using jargon and this course will demystify these concepts.

**Schema?**
Think of Excel. A header row of a sheet is a good example of what a schema is. JSON's object keys is another example. Add data types to the schema and you got Postgres. 

**Types of DB**
✅ Search Engine -> Postgres can do search natively
✅ wide column db -> for scaling a lot data, Facebook developed Cassandra for speed and scale
	⚠ a neat way it works is nodes gossip with another to hop data to other clusters.
✅ Message brokers -> Kafka throws messages into a queue and then picks them off.
	⚠ helpful when have a lot reads and can process a lot of data
	↪ used at WP
✅ Multi Model DB: JSON and SQL together

**ACID** treated as gospel for many in DB world. Great for safety such as bank transactions or health records
ACID stands for atomic operations, consistent, isolated, and durable

Certain technologies trade safety for speed, performance, or cost.
↪ memcache is not durable by design as it focuses on speed

