# ADK
Agent Development Kit

- Use Agent CLI to manage deployment
  google-agents-cli

Intro to Agents and Vibe Coding: NL as the new coding language

https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google

https://adk.dev/community/#courses-deep-dives

A2UI?

- Project Structure
  - agent1
    - __init__.py (imports the local agent.py file)
    - .env
    - agent.py
      - define the agent.  make sure the name property matches the folder name i.e.  agent1
  ```python
   agent1 = Agent(
    name="agent1"
    model="",
    description="",
    instructions=""
   )
  ```

## Agents
- basic
- tool
- litellm
- structure-outputs
- persistent-memory
- multi-agent
- stateful-multi-agent
- callbacks
- sequential-agent
- parallel-agent
- loop-agent
  
## Command CLI
```
adk api_server # FastAPI
adk create     
adk web  # starts FastAPI and web UI to pick from an agent list

```

## Tools
- Function tools
  - Agents-as-tools
- Built-in-tools
  - google search, code execution, RAG
- Third-Party-Tools
  - External libraries LangChain, CrewAI

## Structure Data
- input schema
- output_schema
- output_key
  