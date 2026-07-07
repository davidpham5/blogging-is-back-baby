---
title: So what is at-protocol anyway?
date: 2026-07-06
source: Overrated
isBasedOn: Where It's at://
link: https://overreacted.io/where-its-at/
tags:
  - atproto
  - dan
  - abramov
draft: true
---
The user as the authority is an interesting way to think about a URI. Often when sign up for something we expect the uri to be like `linkedin.com/in/<username>`. But at-proto flips that. The user is front and center: `davidpham5.bsky.social`. This relationship means that the user, not the platform is the owner of the data.

Importantly `atmosphere` is a web of json objects linked together. While Abramov explains a breakdown of the JSON, 
```json
{ 
"uri": "at://did:web:iam.ruuuuu.de/app.bsky.feed.post/3lzy2ji4nms2z", 
"cid": "bafyreiae4ehmkk4rtajs5ncagjhrsv6rj3v6fggphlbpyfco4dzddp42nu", 
	"value": { 
		"text": "posting from did:web, like a boss", 
		"$type": "app.bsky.feed.post", 
		"langs": ["en"], 
		"createdAt": "2025-09-29T12:53:23.048Z" 
	}
}
```

I had two thoughts: 
1) learning SQL and databases, we as software engineers we try to model the world in a way that fits in a spreadsheet. Then we add a backend to talk to the database and set up a client (frontend) to request some data in the form of JSON.
2) This output exists without the need for a sql database. In fact, it's a public record that lives on in some repo. 

An implication here is that the user on platform is usually behind a authentication and authorization of a given platform. Whereas, the user on at-proto is public in the form of their posts are sync in the ecosystem known as `atmostphere`

I am still thinking through what this means in terms of privacy. What if you want a post to be private, or limited to a certain audience? What if the JSON lives in a database, you own and host? 

I find this breakdown insightful for the following:
`{ "uri": "at://did:web:iam.ruuuuu.de/app.bsky.feed.post/3lzy2ji4nms2z", // ...}`

> 1. Resolve the handle to an identity _(“who are you?”)_
> 2. Resolve that identity to a hosting _(“who holds your data?”)_
> 3. Request the JSON from that hosting _(“what is the data?”)_



