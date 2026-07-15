---
title: How to code with AI
date: 2026-06-25
tags:
  - AI
  - engineering
  - prompt
featured: true
---
Theo shared a video his updated way to coding with AI. [How I code with AI changed a lot - YouTube](https://www.youtube.com/watch?v=xJaMTo2YgO8)

Some takeaways: 
- Put attention on the goal and not the details. 
- Converse with the model and importantly listen to any pushback the model provides
- t3 app instead of Codex

Frontend Masters Prompt Engineering
[Introduction - Practical Prompt Engineering | Frontend Masters](https://frontendmasters.com/courses/prompt-engineering/introduction/)

what is prompt engineering: writing effective instructions such that to get desired output. 
- LLM output is nondeterministic
- Mixed of art and science
- unlike a calculator, LLMs work like a probabilistic autocomplete
- scaling laws: 10x size becomes 100x more capable
	- our mobile phones keep track of 5 to 10 words 
	- transformer architecture can track 1000's of words
		- now with Claude 1 million context window
		- hence context window
	> The 2017 'Attention Is All You Need' research paper introduced the transformer architecture with an attention mechanism. This allowed models to pay attention to thousands of words at a time instead of just 5-10 words like phone autocomplete. The architecture also enabled models to learn which tokens mattered most for predictions. Additionally, the paper revealed scaling laws showing that when model size increased by 10X, capability increased by 100X, leading to models that can now handle over a million tokens.

## Adjusting levels of probability
temperature is a lever for deterministic-ish to pure chaos
- AI acting specifically
- /brainstorming or drafting you want to have 1.0 to 1.3 
- If using openAI or anthropic API, you can control temperature. However if using chat, that's not available
> When temperature is set to 0, the LLM becomes essentially deterministic and will always pick the next most likely token. It provides the most predictable and consistent output.

> Lower temperature settings are better for factual tasks, code generation, and data extraction. This is particularly important for applications in healthcare or banking where you want the LLM to behave very specifically and avoid making assumptions or guessing low-percentage tokens.

Top P: alternative to temperature
- considers all options of token prediction
- reducing down to 0.5 Top P will mean consider tokens in the top 50 percentile for token prediction
	- so what does that mean? You can control the degree of randomness in your output but narrowing pool of token possibilities
- Use with alongside temperature 
> Top P is a cumulative probability cutoff that limits which tokens the LLM can consider based on their likelihood. Unlike temperature which controls how often the most likely token is picked, Top P restricts the pool of available tokens. For example, setting Top P to 0.5 means only tokens within the top 50% most likely options are considered.

For example: "Only blue would be available. Setting Top P to 0.5 means only tokens within the top 50% cumulative probability are considered. Since blue represents 75% of the probability, it's the only token within the 50% threshold, cutting out both gray and orange as options."

*If building AI products, this is the first thing to adjust alongside your prompts*

> Tokens are roughly 0.75 words, but not always. This ratio doesn't hold true for code or punctuation. Tokens are to LLMs what words are to humans - they are how LLMs understand and process language. Words are broken down into token IDs that the LLM ingests to understand input.

There is no such thing as memory in LLMs, but they are have a context window in the form of a cumulative tokens (input and output history).  When you hit the context window max, the [oldest context drops off silently](https://frontendmasters.com/courses/prompt-engineering/token-limits-context-windows/)!

It matters a great deal to limit the context window when deciding to what extent do you open the codebase to the LLM. If there is a 1 million token budget, and the codebase is quite large, then consider limiting the LLM to certain paths.

## system message
Your context will fall off before system message. They are not private because they can be jailbroken easily. Do not put in anything sensitive, api keys, or etc.




