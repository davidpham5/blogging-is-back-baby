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

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 334.4295249690302 152.25994272304698" width="334.4295249690302" height="152.25994272304698">
  <!-- svg-source:excalidraw -->
  
  <defs>
    <style class="style-fonts">
      @font-face {
        font-family: Excalifont;
        src: url(data:font/woff2;base64,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);
          }
    </style>
    
  </defs>
  <rect x="0" y="0" width="334.4295249690302" height="152.25994272304698" fill="#ffffff"></rect><g mask="url(#mask-_Vr_sf7jrqZkL__Ha67Bd)" stroke-linecap="round"><g transform="translate(324.06185815194624 11.587089569475495) rotate(0 -157.390625 64.744140625)"><path d="M0.37 -0.36 C-52.03 21.42, -261.24 108.93, -313.69 130.67 M-0.9 -1.59 C-53.42 19.88, -261.74 107.56, -314.06 129.17" stroke="#1e1e1e" stroke-width="2" fill="none"></path></g><g transform="translate(324.06185815194624 11.587089569475495) rotate(0 -157.390625 64.744140625)"><path d="M-295.68 112.23 C-302.83 120.16, -306.83 125.18, -314.06 129.17 M-295.68 112.23 C-301.34 117.15, -307.77 123.24, -314.06 129.17" stroke="#1e1e1e" stroke-width="2" fill="none"></path></g><g transform="translate(324.06185815194624 11.587089569475495) rotate(0 -157.390625 64.744140625)"><path d="M-289.09 128.02 C-298.6 130.33, -304.96 129.7, -314.06 129.17 M-289.09 128.02 C-296.91 127.33, -305.66 127.88, -314.06 129.17" stroke="#1e1e1e" stroke-width="2" fill="none"></path></g></g><mask id="mask-_Vr_sf7jrqZkL__Ha67Bd"><rect x="0" y="0" fill="#fff" width="738.8431081519462" height="241.0753708194755"></rect><rect x="117.37127587655561" y="63.831230194475495" fill="#000" width="98.59991455078125" height="25" opacity="1"></rect></mask><g transform="translate(117.37127587655561 63.831230194475495) rotate(0 49.84348660795948 12.298741167047993)"><text x="49.299957275390625" y="17.619999999999997" font-family="Excalifont, Segoe UI Emoji" font-size="20px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="alphabetic">file copied</text></g></svg>

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

```
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


```typescript
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