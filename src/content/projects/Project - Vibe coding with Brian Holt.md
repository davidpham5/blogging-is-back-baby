---
title: Vibe coding with Brian Holt
date: 2026-07-21
source:
isBasedOn:
link:
tags:
---
[Beyond Vibe Coding](https://vibecoding.holt.courses/)

Harness, the thing that calls the LLM, makes the difference. bholt says Codex is probably best today.

an LLM the actual core model the guessing what you are trying to ask. Agentic means tokens going back to the LLM. Agent and LLM is not really a technical term but a marketing term.

If you can write and read javascript, you can more or less do the same with python.

Code is for humans first and computers second. Authoring code is simple but maintaining code is hard. Optimize for the latter. Terse and clever is a disservice to yourself in the future and coworkers.

Think genAI is the world fastest intern. You are responsible for the code. Shipped code is on you.

floats can be problem in javascript especially in big numbers. use cents to avoid problems when calculating money.

## module or reminders in long division
10 % 3 = 1
1 is the reminder

Objects and Methods

`forEach()` will run once everything on the array.
`dogs.forEach(function something (dog) { console.log("this is a dog " + dog); }`

## How to think about Git
Dont worry too much about having good code in it. Just don't believe you have big barrier to entry. Just share stuff to yourself.

Git was a designed to be peer to peer but nobody use it that way. 

Commit before your agents run loose

## Lets read code together
ReadMe.md is where you should start
index.html, what's on the page, what it is doing
package.json can tell you how it can work.
dont bother styles.css

on scripts, look at `imports`, top variables, read the name of the functions because you are looking for description of the functions

Written a month ago and forgot what I wrote. Reading the code should orient you to how the program works. 

Put in console.logs to debug to see how the program works. 

put into the genAI chat, explain a code block. It's superpower to scruntize the code.

🤖 **Ask your AI Assistant.** Paste in the entire `handleSymbol` function and ask a _why_ question, not a _what_ question: "Why does the backspace branch check whether buffer.length is 1, instead of just chopping the last character every time?" You can verify the answer yourself — delete that check (after committing!) and backspace your way past the last digit to see what an empty screen feels like. What-questions get you explanations; why-questions get you design decisions, and design decisions are what you actually need to understand before letting an agent change code. Get in the habit of asking code _why_ it is the way it is.

master.dev has an api they maintain: ![[image.png]]

HTTP RESTful is just intentions to tell the server about the nature of the request.

OPTIONS is just possible what you get back from the API
HEAD is for the browser

AI prompt: I want a REST api. node server framework is Fastify. 

[Bonus Round – Beyond Vibe Coding](https://vibecoding.holt.courses/lessons/talking-to-servers/bonus-round)

> Want the artisanal version? Building Wordle from scratch, by hand, every line yours, is the capstone project of my [Complete Intro to Web Dev v3](https://holt.fyi/web-dev) — free to watch, and a great "what does authoring actually feel like" follow-up once this course has you reading fluently.

## typescript
 an interface just means type of data is the data? Agents love it.

```typescript
const [pets, setPets] = useState<Pet[]>([]);
```

"takes Pets array"


## now to build shit
npm create vite@latest to build a local project

source maps provide a way to look at not shipped code 

vite comes with rollup/rolldown. It's the state of the art. 

