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
featured: true
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

> A schema defines the structure of data, similar to columns in a spreadsheet. It specifies the expected fields and their types (like name, city, state) that a row or document should contain. Some databases like Postgres have strict schemas that must be adhered to, while document-based databases like MongoDB are schemaless and allow flexible data structures.

**Types of DB**
✅ Search Engine -> Postgres can do search natively
	🥇Solr: Search engine databases like Solr are placed in front of primary databases to perform sophisticated full-text search operations. They allow search functionality to scale independently from the main database, preventing heavy search loads from affecting database performance. This is useful when you need advanced search features or want to isolate search traffic from your primary database workload.
✅ wide column db -> for scaling a lot data, Facebook developed Cassandra for speed and scale
	⚠ a neat way it works is nodes gossip with another to hop data to other clusters.
		🥇 They feature multi-master (multi-primary) architecture where you can read and write to various individual nodes that then gossip with each other to spread information. This enables fast read/write latencies across multiple nodes, making them suitable for applications operating at massive scale.
✅ Message brokers -> Kafka throws messages into a queue and then picks them off.
	⚠ helpful when have a lot reads and can process a lot of data
	↪ used at WP
		↪ Message brokers are systems where you throw messages onto a queue for later processing. They are useful when you need to handle many writes but can tolerate some delay before the writes are processed, or when you have events that need to be processed asynchronously. They can scale to process incredible amounts of data.
✅ Multi Model DB: JSON and SQL together

**ACID** treated as gospel for many in DB world. Great for safety such as bank transactions or health records
ACID stands for atomic operations, consistent, isolated, and durable

Certain technologies trade safety for speed, performance, or cost.
↪ memcache is not durable by design as it focuses on speed

**SQL**
A NoSQL database is more like a folder full of documents, such as markdown files or JSON files. This is different from a relational database which is structured like spreadsheets with defined rows and columns. MongoDB is an example that models its files in this document-based way.

The secret power of relational databases is that they make it really easy to associate things with each other. They are specifically geared towards describing relationships between rows in different tables, such as linking a user in one table to their posts in another table.

**Don't change schema if you can avoid it.**
Changing the schema is expensive because when you add a new column to a database, you have to add it to the table definition and then either add data for that column to all existing rows or leave it empty. This affects all the existing data in the database.

**pgvector container?**
The `pgvector` container is the normal Postgres container with the `pgvector` extension already pre-installed. It provides the same functionality as the standard Postgres container but eliminates the need to manually install the `pgvector` extension

A database is a group of tables that are associated with each other, similar to an entire spreadsheet file. A table is like one tab within that spreadsheet, containing rows and columns. Databases provide hard separation between different sets of data, while tables exist within a database.

In creating a table and adding a record or running a query, in practice you don't need to know the underlying model:

```sql
INSERT INTO users (username, email, full_name) VALUES ('btholt', 'lol@example.com', 'Brian Holt');
```
"insert clauses"

**NOT NULL?**
NOT NULL means the column must have a value provided - the user cannot create a record without providing data for that column. If they don't provide the required value, the query will fail with an error.

**UNIQUE?**
A column with UNIQUE constraint cannot have duplicate values across different rows. For example, emails should typically be UNIQUE so two users can't have the same email. Columns without UNIQUE can have duplicate values, like full names where multiple people might share the same name.

**Default Constraints?**
The DEFAULT constraint specifies a value that will be automatically assigned to the column if the user doesn't provide one when inserting a record. For example, DEFAULT CURRENT_TIMESTAMP automatically sets the column to the current time if no value is provided.

**What does 'PRIMARY KEY GENERATED ALWAYS AS IDENTITY' mean in a table definition?**

It creates an auto-incrementing primary key that starts at 1 and counts upward automatically. This replaces the older SERIAL syntax and is the SQL standard way of creating auto-generated unique identifiers for each row.

## Query DB
Sample DB: [complete-intro-to-databases-v2/public/sample-postgresql.sql at main · btholt/complete-intro-to-databases-v2 · GitHub](https://github.com/btholt/complete-intro-to-databases-v2/blob/main/public/sample-postgresql.sql)
Copy Raw and paste into postgres instance

instead of select all users, 
```sql
SELECT * FROM users;
```

limit to 10
```sql
SELECT * FROM users LIMIT 10;
```

❗Name your columns. When you are doing queries and a column does not exist, it fails. Fail now is to fail quickly. DataDog then can pick it up.
> Explicitly naming columns is recommended because it makes code self-documenting, causes queries to fail loudly if expected columns are missing, and reduces the amount of data transferred across the network, potentially saving on egress and ingress costs. The wildcard `*` is better suited for exploratory work rather than production code.

```sql
SELECT username, user_id FROM users LIMIT 10;
```

Named filter rows or *projections*
```sql
SELECT username AS cool_users, user_id AS j_uids FROM users LIMIT 10;
```

this allows for making JOINS a little easier

**Finding specific records** => `WHERE`
```sql
SELECT username, email, user_id FROM users WHERE user_id=67;
```

**filtering for last_login is NULL**
```sql
SELECT username, email, user_id FROM users WHERE last_login IS NULL LIMIT 20;
```

Looking up users who put in a delete requests for their accounts 6 months ago; Date Math
```sql
SELECT username, email, user_id FROM users WHERE last_login IS NULL AND created_on < NOW() - interval '6 months' LIMIT 10;
```

Wrong order of clauses will break the query. Ask LLM to solve for you

*Aside: The db was empty and did not know why. It appear that it was not saved to disk. So i referred this section: [Querying Postgresql – Complete Intro to Databases v2](https://databases-v2.holt.courses/lessons/sql/querying-postgresql) in the doc and downloaded the sample db and copied and pasted it into my postgres CI*

```sql
# is like length of a array
SELECT COUNT(*) FROM users; 
```

## Count, update, and delete queries
Users that have ever logged in?
```sql
SELECT COUNT(last_login) FROM users;
```

What updates look like: 
```sql
UPDATE users SET last_login = NOW() WHERE user_id=1;

UPDATE users SET last_login = NOW() WHERE user_id=1 RETURNING *;

UPDATE users SET full_name = 'David Pham', email = 'dpham@example.com' WHERE user_id = 2 RET
```

*An aggregation is an operation that takes multiple rows and condenses them down into fewer rows or a single answer. For example, using COUNT(*) to get a total count instead of returning all individual rows is an aggregation.*

**How do you update a single field in a SQL table for a specific row?**
Use the UPDATE statement with SET to specify the new value and WHERE to identify the row. For example: `UPDATE users SET last_login = NOW() WHERE user_id = 1;`

The RETURNING clause returns the affected row(s) after the operation completes. For example, `UPDATE users SET full_name = 'John' WHERE user_id = 2 RETURNING *;` will return the updated row with all its fields.

In SQL, string literals should always use single quotes. For example: `UPDATE users SET full_name = 'Brian' WHERE user_id = 1;`

## Foreign Keys
*Actually boys will chime in and say the following: don't use foreign keys because they have a performance overhead*

> A foreign key is a reference in one table that corresponds to a primary key in another table. It establishes a relationship between tables. For example, a user_id in a comments table that references the user_id in a users table creates a foreign key relationship, indicating that the comment belongs to that user.

It's true. Using foreign keys has a 10% overhead. However foreign keys provide an affordance in safety at the cost of performance. Its worth it to pay more in server time and such than to have a human go debug something in sql.

> Foreign keys maintain data integrity by enforcing that relationships between tables remain valid. They prevent invalid data from being inserted, such as a comment with a user_id that doesn't exist in the users table. This automatic enforcement helps keep data in sync, which is valuable because things that need to stay in sync tend to fall out of sync without enforcement mechanisms.

Whenever you start using the term, "belongs to", thats a good indication that there is a relationship there. 

![Project - Databases Intro-20260702144904085](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/projects/Project-Databases-Intro-20260702144904085.jpg)

How do we know? `REFERENCES` keyword.
Why this is cool? If !user_id, its going to fail. With a large amount of data, you want to be sure of the data, e.g. data integrity. 
- Also in practice, data sync never stays in sync.
- When we talk about safety and the benefits of it from foreign keys, this is what is meant: data integrity stays whole.

If a comment belongs to user_id and you delete the user, the keyword, `CASCADE` will make that change on down. So for example, if the user gets deleted, their associated comments (which they belong to the user) also gets deleted.

> ON DELETE CASCADE automatically deletes all related records in the child table when the parent record is deleted. For example, if a user deletes their account, all comments made by that user would be automatically deleted as well, rather than causing an error or leaving orphaned records.

`ON DELETE NO ACTION` which is default means prevents deleting the parent record if there child records associated. For example, deleting a user in this case would mean first, all comments must be deleted first before getting to the user and deleting said user.

> ON DELETE NO ACTION prevents the deletion of a parent record if there are related child records. For example, if a user has comments on a message board, attempting to delete that user account would fail unless all their comments are deleted first. This is the default behavior in many databases.

If you want to orphan the comment, then using `ON DELETE SET NULL` accomplishes that. For example, on Reddit, the comment still exist under the thread, but you will the user is deleted.

> ON DELETE SET NULL keeps the child records but sets the foreign key column to null when the parent record is deleted. This effectively orphans the child records. For example, if a user is deleted, their comments would remain but the user_id field would be set to null, indicating the comment is no longer associated with a user.

`TEXT` means varchar with no cap

## JOINs

[Joins - Complete Intro to Databases, v2 | Frontend Masters](https://frontendmasters.com/courses/databases-v2/joins/)

INNER JOINs are what matters to us. There other joins, but you will find yourself doing INNER JOINs most frequently (80% of the time), but sometimes it's a LEFT JOIN and one in a while,  RIGHT JOIN.

LEFT JOIN
if it exists in table A, also include that

RIGHT JOIN
Give me users that have no comments, which does not make sense you would that.

OUTER JOIN
I want that exist on either tables but have no any intersections.

Essentially JOINs are done by matching keys and filtering e.g. WHERE

It's a useful mental model to think from biggest set to smallest set. 

Watch out for CROSS JOIN because it give you back every combination of tables and that would mean between 2 tables with 1,000 rows each, you will get 1 million records back. It's explosive.

NATURAL INNER JOIN?
There is no ON clause. Don't ship NATURAL JOINS because without ON clause it becomes less clear what is happening.

**What SQL function can be used to display only the first 20 characters of a comment field as a preview?**
> The LEFT function can be used with the syntax `LEFT(comment, 20)` to retrieve the first 20 characters of a comment. This can be projected using an alias like `AS preview` to make it easier to reference in the result set.
