---
title: learning more about atproto
date: 2026-03-15
featured: true
tags:
  - at-protocol
---
![[project - atproto-20260331235629984.jpg]]

[Protocol Berg v2: Edmund Edgar - Bluesky, atproto, how to hack on it and why it matters - YouTube](https://www.youtube.com/watch?v=2YtvMImH_SE) 
## The PDS v My Old Web Server
- Structured data
	- web server was for document data
- attached to an identity
- contained the social graph
	- all the entiries can refer to other entries on other pds's
- crytographically signed and content addressed. 
	- you dont have to get all the content from the person
- you can self host on a crappy vps, you get viral and your pds can stay up because not going get a data from pds


## The Job of the Relay
![[project - atproto-20260331235700488.jpg]]
 to get the latest changes from the various PDSs and put them in a massive stream known as the Firehose. 
Run you run a bunch of a `appview` which are backend servers. 
Bluesky is running them but also other people are running their own.

## what happens when you post on bluesky
![[project - atproto-20260331235730436.jpg]]

Assign an id, `cid` hashed to make a CID. 

Encoded with DAG-CBOR: a compact binary way encoded structure data and easily roundtrip with json, and easily pass. DAG is a subset of CBOR. 

cid is Content Id

commit node on top and merkle root. and verify your content

## identity
Two takes on identity
`DID:Web` predate at-proto and part of web standards. Just put a document on a web server
`DID:PLC` placeholder or Public Ledger of Credentials ( created by at proto team)

We want to get close as we can to Content REST data. Take the doc that tells you what you need to know about my identity. 
- Put in username
- put in key that controls the identity
- hash on the first update

sign with a key in the previous rotationKeys. If you got a chain of updates, and can be verify
**Trade Off**
if you change your roationkey and someone got your hold of your key, no one could tell when a malicious line of updates goes through
	-  At proto team handles this with a trusted sequencer

## missing features means one dominate client ( like facebook )
- Curation -> for you feed. "Discover" tab
	- anyone can make a feed
	- its easy. listen to changes to the firehouse. pick up the users ids and iterate a bunch ids and any user can take that feed.
	- you can make block list or follow list

## what else can we do with atproto
Everyone in the world gets a self-sovereign crypotgraphically verifiable semantic data store -> this is what we should of done

You can write records on the user behalf to their PDS.
You can auth via OAuth
Oauth flow can create a new account on a PDS host
you can onboard the user to atporto

## lexicon 
You want to follow a lexicon
- decentralized github -> tangled.sh
- PR tracking 
instead of github its on your own git on your PDS

blockchain -> commons data
you have limit who can write to the blockchain

You need data written by the user and owned by the user.