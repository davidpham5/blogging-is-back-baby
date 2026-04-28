---
title: NodeJS API Design
date: 2026-04-27
tags:
  - backend
  - architecture
  - learning
  - nodejs
  - scott
  - moss
  - netflix
  - frontend
  - masters
---
One of the things I am weak at as a fullstack engineer is the backend. I very comfortable in developing interfaces for users. I'm much more confident in CSS, HTML, and JS than I am in NodeJS and Express.

For the past 3 weeks, I've been going through Frontend Masters NodeJS API Design, presented by Scott Moss of Netflix. It's really helpful in understanding the backend. 

Here are my notes:
04-02-2026

https://frontendmasters.com/courses/api-design-nodejs-v5/node-js-servers-overview/
https://api-design-with-node-v5.super.site/
NodeJS primary purpose: build servers, access file systems, interact with databases
API: file system, networking, process management, crypto
secuirty: you roll. your own. DENO has an optin to security

from a frontend perspective

the mental model shift 
you write fetch() and assign results 
```js
const data = await fetch('/api/users')
const users = await data.json();
```

backend perspective
```js
app.get('/api/users', async ( req, res) => {
	const users = await db.query(
		'SELECT * FROM users';
	)
	res.json(users);
})
```

the browser gives us free security
you can natively use ES modules in the browsers

## Serverless Functions 
allows for functions to  fire when api hits it. They don't have to be always on but this comes at the cost of speed. something like web sockets is that lives long cant use serverless. 

## CDN
You can write pure JS now on CDN. 10 years ago you could do some logic but nothing like scripting 
![[Drawing 2026-03-26 21.23.04.excalidraw.svg]]

Edge function is programmable CDN

## background job
async job. tasks that run outside the request-response cycle
- send email
- processing images
- data  sync
- heavy computation
They have less to do with the user and more to with architecture choices 

## Cron job
A type of background job that runs at an interval  

**What is an HTTP verb in the context of server routing?**
An HTTP verb is an action or type of request indicating the desired operation to be performed on a server, such as GET, POST, PUT, DELETE, etc.

## env
an important thing to know about `.env` is that when we use `process.env.SECRET` the value is rendered at runtime for client side frameworks. Sure you have it shared in github but it's exposed still.

It's a great way to change configuration without changing your code. the EQUIVALENT on the frontend is a feature flag.

*They allow dynamic value changes without hard-coding variables, making it easier to manage different settings for staging, production, and local development environments*

this is not type unless you look at `.env`. they can be a lot env variables. so how do we keep track of them? https://frontendmasters.com/courses/api-design-nodejs-v5/dev-production-variables/

challenges with env:
They are not typed, and it's difficult to know which ones exist without checking the .env file or consulting an experienced team member

**Why create multiple .env files like .env, .env.example, and .env.test?**
To separate environment configurations, keep secrets out of version control, and provide example variable names for team members while allowing different configurations for testing

Zod
Zod provides runtime type-checking and schema validation, allowing verification of environment variable types and presence at runtime

**Rotating Secrets**
What is a strategy for managing secrets and sensitive configuration values?
Rotate secrets periodically, use secrets management tools like HashiCorp Vault, and avoid hardcoding sensitive information

## understand HTTP routing
it's combination of a verb and path pattern

| verb   | purppose                         | example                | expected result             |
| ------ | -------------------------------- | ---------------------- | --------------------------- |
| GET    | fetch data                       | GET `/api/users`       | list of users               |
| POST   | Create new resource              | POST `/api/users`      | create new user             |
| PUT    | update (replace) entire resource | PUT `/api/users/123`   | User 123 completely updated |
| PATCH  | partial update                   | PATCH `api/users/123`  | user 123 partially updated  |
| DELETE | remove resource                  | DELETE `/api/user/123` | User 123 deleted            |
if you do graphql, you care about POST requests

**what is RESTful**
for every 'resource', like tags, user, comment, file, you will have a CRUD routes on a resources
https://frontendmasters.com/courses/api-design-nodejs-v5/http-verbs-restful-route-patterns/
GET === READ
POST === CREATE
PUT/PATCH === UPDATE
DELETE === DELETE

if you need a concurrence of resources, and therefore need to call a few APIs,  you may overfetch. GraphQL provides a way to query many APIs and get the exact data you want. the trade offs are significant: permissions, cache, query optimizations 

RESTful API is a beautiful thing because we just agree to it and built CRUD apps that serve the web for everyone. 

The server provides a level of freedom a frontend dev does not have. A backend dev tells you want the routes are and how they are defined

## Routes
Sub-routers are individual routers for specific resources that can be mounted onto a top-level router. They are typically created by importing the Router from Express and are organized by resource type (e.g., User Routes, Habit Routes).

typical CRUD routes for a Habit resource include: GET / (get all habits), GET /:id (get a single habit), POST / (create a habit), DELETE /:id (delete a habit), and potentially custom routes like POST /complete/:id.

## Mounting via `use`
https://frontendmasters.com/courses/api-design-nodejs-v5/mounting-routes-with-use-middleware/
`use` is for no http verb related to the route. It's a way to apply an action to a route. For example, dev wants to hit `/api/auth`, instead of a callback like `(res, req) => {}` we use our `authRoutes`
 ```js
 import authRoutes from './routes/authRoutes.ts'
 
 app.use('/api/auth', authRoutes)
 ```
Anyone who hits a route, defined in `authRoutes`, `/api/auth/register` then use that handler. `.use()` handles all HTTP methods for a given route regardless of the specific verb. Subroutes allow you to mount routes under a specific base path, so a route like `/register` under `/api/auth` would become `/api/auth/register`

Mounting allows you to specify a base route path for a group of routes, so routes can be decoupled and easily relocated without changing internal route definitions

## [[Middleware]]
NextJS has middleware.ts 
edge functions on the network layer before the server
CDN edge functions

HTTP interceptors -> axios fetch, apollo interceptor

our foucs is backend middleware
using `use()` without a path is known as global middleware, e.g. logging
how is middleware built?
Express, middleware is left to right. if you are going to respond, in middleware, don't run next()
simply it's an array of functions. each function is wrapped in a next() function. Its known as a controlled loop.

## understanding `next()`
doing a side effect like analytics log
- another good example of middleware is credit card check, like expiration date is checked
- passing an arg in `next()` will be handle by Express as an error
- error handling is just middleware too

The dominate pattern: `(req, res, next)`

What is the recommended practice when responding inside middleware?
Always call `return` after responding, unless it's the last line of code. This prevents subsequent code from running after the response has been sent.

## CORS
Options request -> preflight
allowList? unless you are writing in the server
`helmet` security package
`morgan` is a request logger

## validate inputs: 
https://frontendmasters.com/courses/api-design-nodejs-v5/validation-middleware/

to avoid checking them with a bunch if/else statements

asnyc middleware wrapper: avoid wrriting a lot of try-catch  statements, and instead wrap it in a function curry
https://frontendmasters.com/courses/api-design-nodejs-v5/async-middleware-pitfalls/

## Databases
[https://frontendmasters.com/courses/api-design-nodejs-v5/database-schemas/](https://frontendmasters.com/courses/api-design-nodejs-v5/database-schemas/)

Migrations: they suck! [https://api-design-with-node-v5.super.site/4-db-setup-and-schema](https://api-design-with-node-v5.super.site/4-db-setup-and-schema)  
Think of them as database versioned.  
**Migration Workflow:**

1. **Develop**: Make schema changes in code
2. **Generate**: Create migration files automatically
3. **Review**: Inspect generated SQL before applying
4. **Apply**: Run migrations against database
5. **Deploy**: Apply same migrations in production

If you can find a way to do only non-destructive changes, then make your life a lot easier

### ORM Benefits for APIs

|                          |                                     |                               |
| ------------------------ | ----------------------------------- | ----------------------------- |
| **Benefit**              | **Description**                     | **Impact**                    |
| **Type Safety**          | Compile-time error checking         | Fewer runtime bugs, better DX |
| **Query Building**       | Programmatic query construction     | Dynamic filtering, pagination |
| **Relationship Loading** | Automatic joins and includes        | Less code, optimized queries  |
| **Schema Management**    | Version-controlled database changes | Reliable deployments          |
| **Migration System**     | Automated schema evolution          | Safe production updates       |

## Migrations: Database Version Control
Migrations are versioned scripts that modify your database schema over time:

## Drizzle vs Other ORMs

### Why Drizzle Over Prisma?

### Prisma Approach

```none
// schema.prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  habits Habit[]
}

model Habit {
  id     String @id @default(cuid())
  name   String
  userId String
  user   User   @relation(fields: [userId], references: [id])
}
```

**Requires:**

1. Schema definition in Prisma language
2. Generated client (`prisma generate`)
3. Build step in deployment
4. Black box query generation

### Drizzle Approach


```none
// Pure TypeScript schema
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique()
})

export const habits = pgTable('habits', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  userId: uuid('user_id').references(() => users.id)
})
```

**Benefits:**

1. Pure TypeScript - no DSL
2. No code generation step
3. SQL-like API - predictable queries
4. Lightweight and fast
## Implementing the Schema
refer to coding project
**File:** `src/db/schema.ts`