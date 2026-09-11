# Dashboard AI Week

- Google doc [here](https://docs.google.com/document/d/1Y0A46I6VQLSi1JnE68S5KzHIGBT1ixP8l492AR1d5Vg/edit?tab=t.p03jtmvacv2w){target="_blank"}
- :tv: [What are Skills, Agents, Prompts, Instructions and how to use them?](https://www.youtube.com/watch?v=QcxL0SXILC4){target="_blank"}
- AI DLC
  - [AWS re:Invent 2025 - Introducing AI driven development lifecycle (AI-DLC) (DVT214)](https://www.youtube.com/watch?v=1HNUH6j5t4A){target="_blank"}
  - [Build Smarter with AI-Driven Development Life Cycle (AI-DLC)](https://www.youtube.com/live/5kUb_IZdlB8){target="_blank"}
- Harnesses in AI
  - [Harnesses in AI: A Deep Dive — Tejas Kumar, IBM](https://www.youtube.com/watch?v=C_GG5g38vLU){target="_blank"}
  - [What Is AI Harness Exactly?](https://www.youtube.com/watch?v=sFHXYv7ANkc){target="_blank"}

# What are Skills, Agents, Prompts, Instructions and how to use them?

- A prompt is a one-time chat message.
- An instruction is a permanent rule for a project.
- A skill is a tool the AI loads only when needed.

## AGENTS.md

- inspired by CLAUDE.md from Anthropic
- Instead of having md files for each vendor
- `.github/copilot-instructions.md` used for github copilot as your PR code reviewer
- `/init`
- AGENTS.md sections
  - Architecture overview
  - Dos and Donts
  - Comments
- Better to have AGENTS.md for each project module as well

## Custom Agents

- `agents` folder
- They are like specialized colleagues, can be given some personality
- Orchestrator Agent, Planner Agent and Coder Agent
  - cleaner context memory
- .github/agents, uses tools
- [github/awesome-copilot](https://github.com/github/awesome-copilot){target="_blank"}
- SubAgents vs Agent Teams
  - Subagent reports back to orchestrator
  - Agent team communicate with other agents

![image](https://pbs.twimg.com/media/HAbME1jacAElNbd?format=jpg&name=medium)

## Hooks

- `hooks` folder
- Hooks run before agents are loaded
- They have lifecycle methods like sessionStart, sessionEnd, userPromptSubmitted etc
- Try some hooks from awesome-copilot
- example : secret scanner and governance-audit
- Show agent logs in vscode, `ask a questions in chat` -> `setting (gear icon) in chat` -> `agent logs`
  - Loaded instructions -> skills -> hooks -> agents

## Instructions

- `instructions` folder
- has applyTo liquid attribute
- mention in main AGENTS.md when to refer which instruction
- A global rule file that stays active across the whole project. example use java 11 and gradle instead of maven

## Prompts

- `prompts` folder
- use `/explain-code` for `.github/prompts/explain-code.prompt.md`
- example: brief overview, step-by-step breakdown, key concepts and terms, common use cases

## Skills

- `skills` folder
- Folder based capability packages with a required SKILL.md that are loaded by an Agent on-demand
- `.github/skills/breakdown-plan/SKILLS.md` will create some docs
- invokable
- Persistent, modular files loaded only when triggered.

## Workflow

- `workflow` folder
- Copilot coding agent works anonymously in a Github actions-powered env to complete development tasks and creates pull requests with the result.
- daily-issues-report

# AI-DLC

- AI driven development lifecycle (AI-DLC)
  - `AI Creates Plan` -> `Human Verify Plan` -> `AI refines Plan` -> `AI executes plan` -> `Human verify outcome`
- Approach 1 : AI Managed 
  - AI autonomously builds and maintains software with leasat ot zero human involvement
- Approach 2 : AI Assisted
  - Developers still perform the intellectual heavy lifting and apply AI in narrow tasks
- Steps
  - Inception (Mob Elaboration)
    - Build Context on existing codes 
    - Elaborate intent with user stories. 
    - Plan with units of work.
  - Construction (Mob Construction)
    - Domain model (component model)
    - Add architectural components
    - genrate code and test
  - Operation (CICD) 
    - Deploy in Prod with IaaC
    - Manage incidents - AI first, Fast feedback to dev
- Avoid vibe coding
  - Can you debug every line of code?
  - Do you understand the code end-to-end?
- Start with small simple tasks
  - No complex task that may succeed
  - Start by vreating simple tasks that always succeed
  - Continue breaking into the specific functions, files or flows
- Clear context, keep context focused
- Ask AI to mimic existing code examples rather than complex instructions
- semantics ratio in the tokens
  - good : `refactor using builder pattern`
  - bad : `ability to build complex object blah blah`
- Beware fo Model's stale training dataset
- Keep number of MCP tools minimal
  - required MCP uses context window or something else
- Old measuring metrics don't work anymore like lines of code
- Is re-writing faster than patching
- Example : Fast API to support QUERY http method
  - `.amazonq` folder had AI-DLC rules 
  - it outputs aidlc-docs folder based on the instructions
    - rule had inception/reverse-engineering folder
- :link: [github aidlc core-workflow](https://github.com/awslabs/aidlc-workflows/blob/main/aidlc-rules/aws-aidlc-rules/core-workflow.md){target="_blank"}


# Harnesses in AI

- Why? Reliability
- An AI harness (also called an agent harness) is the software infrastructure, tools, and rules wrapped around an AI model to make it work reliably in the real world.
- While a raw Artificial Intelligence model is just a "text-in, text-out" brain, it cannot actually perform tasks on its own. The harness is the system that connects that brain to the outside world, giving it tools, memory, and safety guardrails. 
- `Agent = Model + Harness`
- Six Core Layers of an AI Harness
  - The Execution Loop: It keeps the AI running in a continuous loop (Observe ➔ Decide ➔ Act ➔ Verify) until the job is fully done.
  - Tool Management: It gives the AI the ability to click buttons, search the web, read files, and run code.
  - Context Engineering: It filters information so the AI only sees what is relevant, preventing it from getting overwhelmed.
  - Persistence (Memory): It saves the AI’s progress to a database so it does not forget what it was doing if the system restarts.
  - Verification: It automatically checks the AI's work—like running a code test—to catch mistakes before a human sees them.
  - Constraints (Guardrails): It blocks the AI from taking dangerous actions, like deleting important company files.
- Agent Harness
  - Tool Registry
  - Model
  - Context Management
  - Guardrails
  - Agent Loops
  - Verify
- Example : Use ChatFPT 3.5 and harness it
- 