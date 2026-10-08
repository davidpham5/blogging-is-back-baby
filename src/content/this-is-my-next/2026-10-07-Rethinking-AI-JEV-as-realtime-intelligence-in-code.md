---
title: Rethinking AI - JEV as realtime intellience in code
date: "2026"
source: mega.dev
isBasedOn: "Rethinking AI with Jev: Instant, Nearly Free, and Unlocking What's Next"
link: https://www.youtube.com/watch?v=3MwcIgBRras
tags:
  - JEV
  - AI
  - egghead
  - john
  - linquist
  - demo
---
The user input does not go into LLM, but into JEV
![image-1|700x480](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-1.png)

if you give JEV to infer on, you can throw all conditions at the same time. You can discard that don't matter and apply logic that matters. 

![image-2](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-2.png)

As you preload, as things float the top, you can pick what is most relevant. 

Support emails to 1 of 4 teams?

![image-3](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-3.png)

![image-4](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-4.png)

Haiku v JEV
JEV finishes way before Haiku

![image-5](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-5.png)

A system one model, after the fast thinking in pyschology

Typesafe AI -> Confidence routing 

![image-6](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-6.png)

Confidence score sets one floor per action

How can we apply JEV and it's confidence scoring to privacy engineering? 

AI can be so cheap (JEV) it can be difficult to measure. JEV will go barely gong 

Categorize email, bulk data, toss any questions against it. If below a threshold, you can automate. Above a threshold, defer to a person as a fallback. A default if a function does not match, is to defer to a person. 

Logs can capture what falls through and you can evolve the code.

The speed is almost instantaneous. What to build realtime AI? Its faster than human perceptions. Debouncing is important.

Browser use Demo: Chrome extension

![image-7](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-7.png)

John L. speech to text searching for flights. 
![image-8](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-8.png)

For typing, has to hand off to Haiku. You can take this approach and hand off to anything visual

- Catchpoint tests, turbo charged.
- e2e tests turbo charged

![image-9](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-9.png)

Smart time to pick from the UI elements 

## doing multiple things at the time

![image-10](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-10.png)

You get this experience, and saying things to wanting to happen. UI needed to show what is happening. When building ux, providing animations to convey what is occurring -- because it's too darn fast!

Things are developing into a game loop. Its becoming much more interactive experience and less of clicking around.

## breaking down a sentence.

![image-11](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-11.png)

It's important to see, all questions are answered at the same time. When you have a little data, what do you need to ask it in order to get where it needs to go in relation to buckets (to match in db)

![image-12](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-12.png)

Think of your job, the content of the menu and how it's strucuture, and customers are placing orders in human speech. Your job is to set up the menu and instructions. Think yourself what questions are asking. Skills that Typesafe shares is a cookbook, you can JEV a question. 

Ask questions that could applied, known as Speculative Fan out (TypeSafe)

![image-13](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-13.png)

## Search hours of video in one video

![image-14](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-14.png)

six youtube videos. its going to do video processing. Fire a question, based on each video's transcript

![image-15](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-15.png)

Find the exact portion each video

Taking each chunk and reassemble into a one video

![image-16](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-16.png)

![image-17](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-17.png)

another round in answering if the filer stays or drops?

3 rounds, eight requests in blazing speed.

Composite scoring
![image-18](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-18.png)

The ranking lives in your code. the weights

Different from keyword finding because it's inferring from words. A smarter search

## Wikipedia ends up in philosophy

JEV uses wikipedia api to find philosophy

![image-19](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-19.png)

Agentic engine optimization, to find the broken paths or fastest paths to get from A to B. thinking about the users. 

Which one gets you closer to philosophy?
![image-20](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-20.png)

this is throwing JEV, whatever is user or agent facing, crawling and walking arrive it's destination using every navigate it on the page. You can surface your project, or UI like dropdowns, you can ask JEV to test for you. User test is still necessary. You can tell Opus make up 50 case scenarios, JEV can surface where the tensions and friction is.

## send three robots at a job

Functions and with state

![image-21](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-21.png)

There is a lot tasks that depends on state (like time), that might block a function the agent uses and blocks them. This allows for a router to get to task. 

![image-22](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-22.png)

JEV makes the judgement calls and the code does the rest.

Share a plan, in queue order
Planning the building data model needs reasoner

![image-23](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-23.png)

Mechanical changes, the builder 1 and 2 can take on those.

Kind of like a dynamic state machine. 

What about a lot tasks to choose from, or has similar tasks?
![image-24](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-24.png)

## intent routing

![image-25](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-25.png)

JEV, a date parser and router for plain code

narrows the task list to a few candidates

![image-26](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-26.png)

The list stays short, narrow it in code first and it needs to be deterministic keep it code

JEV makes the quick decisions. JEV does not replace for everything. Avoid forcing it in things that have been solved in traditional programming. 

![image-27](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-27.png)

Todo app, matching app and narrowing down for JEV to pick from. JEV will get more expensive. It's meant for quick questions with messy data and messy users. 

## before you ship

![image-28](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-28.png)

Every message walks through JEV

log how JEV walks. Code the path and avoid using JEV

![image-29](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-29.png)



![image-30](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-30.png)

Four patterns TypeSafe cites in their docs

![image-31](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-31.png)

Pave what repeats:
![image-32](https://res.cloudinary.com/dpham5/image/upload/f_auto,q_auto,w_800/blog/this-is-my-next/image-32.png)

Cheap: JEV and Perplexity option

A little smarter, but 10x the cost. JEV has the best balance. As any product, they are going to try to win over users. 

John L. spent $6. millions of requests. A dollar will translate a month of usage

OpenRouter? look into it. Between it's decisions can vary in scores by decimals. You won't be able switch JEV to another thing because it may work differently. There is statical anonomlies. 

Your product is your factory; your factory is your product. You can point a video and analyze and Opus will reverse engineer it in 15 minutes.
## mega.dev next things
Personal software is easy. Production good software is much more difficult. 
- Dog fooding and caring about your users
- If you don't use the tool, it will show.

Managing software with agents. Feedback systems conversing with your team and getting back with agents is critical. 

you can do research with similar products and surface the pain points. 

You can customize the tools on the terminal level and build tools for teams.