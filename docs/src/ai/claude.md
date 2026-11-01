# Claude Code

## References

- [Claude Code for Everyone](https://learning.oreilly.com/live-events/claude-code-for-everyone/0642572274368/0642572301576/){target="_blank"}

## What is Claude Code?

- Claude Code is an AI agent
- Regular AI (like chatgpt) gives you direction while claude code can drive you to destination
- Claude Cowork is build on Claude Code

## commands vs skills vs agents

- Commands (.claude/commands/): manual, user-triggered shortcuts (e.g., /fix).
  - Simple Markdown files representing shortcuts. Best for quick, manual, repetitive tasks.
- Skills (.claude/skills/): Intelligent, auto-discovered capabilities activated by Claude based on context. 
  - Proactive, context-aware routines that include metadata, prompt files, and tools. 
  - They can be triggered by you (/skillname) or automatically by Claude when a relevant scenario arises.
- Agents (Subagents): Isolated workers that perform complex tasks in separate contexts.
  - Separate Claude sessions designed for, and tasked with, complex workflows (e.g., "Architect," "Researcher"). 
  - They excel at working in parallel, reading many files without clogging the main session context. 

### When to Use Which?
- Command: "I need to run my [3] /deploy` script immediately."
- Skill: "I want Claude to notice when I write new code and automatically offer to write unit tests for it".
- Agent: "I need to refactor this entire 100-file repository without destroying my current chat's context".

> Note: Recent updates have merged commands into the skills system, allowing skills to be user-invocable, though skills offer more flexibility. 

```md
<!-- ~/.claude/skills/explain-code/SKILL.md -->
---
name: explain-code
description: Explains complex code using analogies and visual diagrams. Use when the user asks "how does this work?", "explain this file", or "walk me through this logic."
---

# Explain Code Skill
When this skill is triggered, follow these steps to ensure the user truly understands the underlying logic:

## 1. The Analogy
Start by comparing the code's function to a real-world concept (e.g., a restaurant kitchen, a post office, or a factory line).

## 2. Visual Diagram
Create an ASCII art diagram representing the data flow or architecture.
Example:
[Input] -> (Process A) -> {Validation} -> [Output]

## 3. Deep Dive
Walk through the code block by block. Explain *why* certain patterns (like recursion or specific hooks) were used over alternatives.

## 4. The "Gotcha"
Identify one common pitfall or edge case related to this specific code that a developer might miss.
```

## Folder Structure
Skills are more than just a single file; they are folders that can contain supporting materials that Claude "discovers" as needed: 
- SKILL.md: The core instructions (Required).
- references/: Deep documentation or API schemas.
- scripts/: Executable scripts (Python/Bash) that Claude can run to perform deterministic tasks.
- assets/: Templates or static files used in output.

