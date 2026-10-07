---
title: Ai Agents that never sleep instructed by Scott Moss
date: 2026-09-29
source: master.dev
isBasedOn: Ai Agents that never sleep i
link: https://master.dev/workshops/background-agents/
tags:
  - AI
  - agents
  - scott
  - moss
---
# Building custom harness
https://master.dev/workshops/background-agents/
https://github.com/davidpham5/xeno-agents
https://github.com/Hendrixer/background-agents

what is background agent?
agent handles the job. background agent activates task from events from the outside. It does not have to. They are the real productivity unlock. You can always going as fast as your prompt. 

The best way to increase productivity is a machine does the work of a team and when to do the job and how to the job well.

A background agent is to reach a state. The BA is to reach the state. BA more durable. It is as if you asked someone to go figure out work arounds to blockers. 

Who has the authority now? Fully auto mode? Add to a block list? add to a allow list. who has the authority to recognize permission. 

What the LLM to do versus what the harness to do. The harness is deterministic. 

The thinking framework: **Observe, Decide, and Act Loop**. Similar to how most Agent frameworks work today. No tooling calling today. We can have agent wait on background actions

It usually can't suspend. state might changed. connection closed.
Wait period, no compute is being used.

---
get a neon new db
openapi secret key

```bash
npm run db:push
npm run preflight # you have dependencies ready
npm run db:seed 
```

Spin up a few things now:

Set up agent endpoint to run the agent. 
Run the web app
Actual checkout service 
--> all in `package.json`

- ingest spins up the endpoint
`npm run dev:checkout` to spin up the checkout service

if you want watch instead live code, you can git switch lessons or ask the agent to get you caught up.

---
What if we build an environment that provides more intelligent context. For example, screen shots and point out things in the screenshot. For this project, is the state of the server. Snapshot that and let it act on that.

Observing the current world is something the agent does not get to decide that. The agent will choose action, based on historical actions. The next action is to say i am done? or ask for help? or learn more? 

Harness then validates and executes. Avoid losing important data, money, etc. Rollbacks are destructive. It does not distinguish a person doing the rollback or a machine. 

---
mock a fault
```bash
npm run dev:checkout -- --fault feature
```

we are going to building a custom harness.

Inngest: how you can make your code durable. 

---
`agent-workflow`

redux reducer pattern

LLM part is the easy part. It's the harness is where the hard work because thats the interface for LLM

Structured Outputs -> ai engineering course. return a promise to handle a output you defined. `decisionSchema` in `agent-brain.ts`

JEV will be good for what is the likely actions. JEV wont generate new tokens for a new argument Not a drop in replacement. new archiecture is needed.

Tool loop, not ready to answer, so it calls other tools or infra. 

- at some point break the loop and the harness
- [ ] revisit AI engineering to go over structured inputs and outputs.
- [ ] also look into freecodecamp's building a harness from scratch

**`agents-workflow` summary**
if not any the return events, it will keep looping. Maybe we can't close the gap in reasoning, we need to have an agent reach for the LLM. 

lets spin up the entire service:
```json
"dev:checkout": "tsx service/checkout.ts",
"dev:operator": "INNGEST_DEV=1 tsx watch server/operator.ts",
"dev:agent": "INNGEST_DEV=1 tsx watch server/agent.ts",
"dev:web": "vite --host 127.0.0.1",
"dev:inngest": "inngest dev -u http://127.0.0.1:3002/api/inngest",
```

an action that stops the loop or terminates the loop

double check you ran the fault, 
```shell
npm run dev:checkout -- --fault feature
```

Inngest has a cool dashboard.

what actions require a human to judge what to do?
what guardrails, that has infrastructure implications

"It's a like a state machine"

you can check in the inngest server dashboard at [http://127.0.0.1:8288/runs](http://127.0.0.1:8288/runs)

---
add act step in agent-workflows

A step is much like a `useMemo`. Re-executed loop. Step is something that is expensive and we want it save deterministically 
```js
// this is going to hit our LLM. You often wants to put this in a step because this cost money/tokens

// we do not want LLM at top because its probalistic and its different every time.

// thinks a step is a useMemo() in react.

const decision = await step.run(`choose-action-$cycle}`, () =>

chooseAction(run.goal, state),

);
```

we do not want to put LLM outside of a step

`tool-policy`
different type of policies we have.

steps should be idempotent because you don't want execute an action over again and change the state.

validate stuff. its just on and without prompt

---
lesson 03
there is an incident but we don't have enough information, so wait for more info. or we've seen this error before and we can ignore, but if we see this other error, then do something.

a dependency may recover while the agent is idle. Doorbell by event. it may go back to sleep before there is more. 

We want the model to choose to wait. we can force the agent to wait.

if 3rd party dependency, does the agent ask for help or wait or what? there are many cases an agent will wait. 

timeout is 3 days! thats why these steps have to be deterministic. Inngest docs. 
Treat this step as async function and not suspending the call stack.

The `inngest.createFunction()` wraps the workflow in a deterministic shell. Everything inside it must be deterministic, outside a step(). Instead, the steps themselves have to be idempotent. So what does that mean? If the workflow was based on date and it responds to dates, its not deterministic.

---

lesson 4 Human back in control

The agent can signal that it needs help.
Inngest has docs to bring humans in the loop. They treat slack as their inbox instead of building an inbox

Human Ai decision making can skew Ai's actions. Don't tell it that you reviewing it.

Approval is not a universal safety shield

De-risk or build a rollout mechanism. looking at a inbox and why are you doing that. 

AgentDojo: read the paper about prompt injection by using human in the loop

we take a snapshot of the snapshot for the state. You may get different results if you run this

Does the state drifted so much when the proposed action was brought forth.

```js
const proposalId = await step.run(
          `propose-action-${cycle}`,
          async () => {
            const proposal = await proposeAction(
              environmentId,
              runId,
              actionId,
              decision.action,
              input,
            );
            return proposal.id;
          },
        );
        // why create a proposal to only get the id and then here
        // and then make a proposal here?
        // because proposal overwrite. Get variable from DB and not cache value at some point
        // Getting stale proposals from the above will lead to a bug
        let proposal = await step.run(`read-human-${cycle}`, () =>
          getProposal(proposalId),
);
```

- we got an inbox notification!
- we finished approval request 
- and approved
- Run completed!

---
lesson 5 - Idemopentecy
Aws has good doc on it: https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

stripe won't make transaction happen more than once. because it has idemopotency 

- [ ] read the papers from the Labs and challenge you that you have not thought about. With the help AI, slowly insight appear. Connections can then be made. 
- [ ] Replicate some of the experiments 
- [ ] you will be ahead of the game.
Scott Moss has used research papers in his Netflx job. Then he'll communicated it. His team then will share that worked a bit!
