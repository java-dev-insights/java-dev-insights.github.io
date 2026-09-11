# Artificial Intelligence (AI)

<YouTubeEmbed video-id="IauULFe1j-A" /><br/>

<YouTubeEmbed video-id="kn6dxL53NkM" /><br/>

- Skills Plan : [AI Agents](skills/ai-agents) and [Agentic AI](skills/agentic-ai)


## Notes for Oreilly Courses

- [Using AI as Personal Learning Coach](ai-learning-coach)
- [GitHub Copilot](github-copilot)
- [Spring AI](spring-ai) : [Introduction](introduction)
- [Claude](claude)
- [MCP](mcp)
- [OpenCode and GitAI](opencode)
- Comparisions
  

## References

- Text
  - [Agent Skills Vs MCP Vs Prompts Vs Projects Vs Subagents :A Comparative Analysis](https://medium.com/@tahirbalarabe2/agent-skills-vs-mcp-vs-prompts-vs-projects-vs-subagents-a-comparative-analysis-7a36cd85cb74){target="_blank"}
- Video
  - [Harvard CS50’s Artificial Intelligence with Python – Full University Course](https://www.youtube.com/watch?v=5NgNicANyqM){target="_blank"}
  - [All Machine Learning algorithms explained in 17 min](https://www.youtube.com/watch?v=E0Hmnixke2g){target="_blank"}
  - [How JP Morgan Built An AI Agent for Investment Research with LangGraph - LangChain Interrupt](https://www.youtube.com/watch?v=yMalr0jiOAc){target="_blank"}

```
AGENT = Model + Harness + UI
```


## Why AI for Java Developers?

- Industry-wide AI Adoption?
  - Retail
  - Healthcare
  - etc
- Enhance Problem Solving Abilities
- Stay Competitive in the Job Market


### Items Covered
- Intro to LLM OpenAPI ChatGPT
- Chat based AI apps using OpenAI APIs
- Prompt Engineering
- Generate Structured Data with OpenAI
- Function Calling using Tools with OpenAI
- RAG Based Q&A
- Multimodality : Images, Vision and Audio with OpenAI
- Run LLMs locally and build AI apps interact with them.

## Spring AI

- Module for building applications using LLM for easy AI integration into Spring Framework
- Builds Enterprise-Grade AI applications
- spring-ai docs [here](https://docs.spring.io/spring-ai/reference/index.html){target="_blank"}

## Using OpenAI with spring-ai

- Account Setup
  - Create [OpenAI account](https://openai.com/){target="_blank"}
  - create APIkey and store it as env variable
  - check the playground and do compare by asking same question - `What is an LLM?`
    - 4o vs 4o-mini
    - 4o gives options
    - 4o-mini assumed we asked for Large Language Model
- Install Java 24 using sdkman `sdk list java` and `sdk install java 24.0.1-tem`
- clone instructor's project [here](https://github.com/dilipsundarraj1/spring-ai){target="_blank"}
- `org.springframework.ai:spring-ai-starter-model-openai` and property `spring.ai.openai.api-key=${OPENAI_KEY}`
- ChatClient calls internally OpenAI chat completion endpoint [here](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create){target="_blank"}
- Promt, Tokens and Tokenizations
  - `user prompt -> tokenizations -> Processing using Transformer Architecture -> Generate Tokens -> De-tokenization -> output`
- importatnt params - `temprature` (lower is more relvant response), `max_completion_tokens`
- Prompt - `User Message` + `System Message` + `Assistant Message`
  - system message like *SystemMessage("You are a helpful assistant, who can answer java based questions. For any other questions, please respond with I don't know in a funny way!");
- Streaming ChatClient response (Async - Non blocking) using Flux in response instead of sync response Object
- conversation - What's my name return don't know an

```java
ChatClient.builder().build()
.prompt()
.user(userInput.prompt())
.system(systemMessage)
.call()
.content()
```

- SpringAdvisors
