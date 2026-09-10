## Data

```json
{
  "sensor": "vibration_motor_3A",
  "timestamp": "2025-06-18T11:47:00Z",
  "value": 0.84,
  "unit": "mm/s",
  "ucl": 0.90,
  "lcl": 0.50,
  "trend_window": [0.71, 0.76, 0.79, 0.81, 0.84],
  "alert_enabled": true
}

{
  "sensor": "vibration_motor_3A",
  "timestamp": "2025-06-18T11:47:03Z",
  "value": 0.94,
  "unit": "mm/s",
  "ucl": 0.90,
  "lcl": 0.50,
  "trend_window": [0.81, 0.89, 0.91, 0.92, 0.94],
  "alert_enabled": true
}

{
  "sensor": "vibration_motor_3A",
  "timestamp": "2025-06-18T11:47:06Z",
  "value": 0.86,
  "unit": "mm/s",
  "ucl": 0.90,
  "lcl": 0.50,
  "trend_window": [0.89, 0.91, 0.94, 0.86],
  "alert_enabled": true
}

{
  "sensor": "vibration_motor_3A",
  "timestamp": "2025-06-18T11:47:09Z",
  "value": 0.89,
  "unit": "mm/s",
  "ucl": 0.90,
  "lcl": 0.50,
  "trend_window": [0.91, 0.94, 0.86, 0.89],
  "alert_enabled": true
}


```

You can tweak it easily for different conditions:

- Raise the last value to 0.92 to trigger an out-of-control alarm.
- Add more entries to trend_window to simulate a slow drift or control rule violation.
- Change alert_enabled to false to simulate silent monitoring mode.


- System Prompt
  
You are a specialized control chart monitoring agent in a manufacturing environment. > Your core responsibility is to assess whether a process is trending out of control based on recent sensor readings and known control limits. > > Your role: > - Receive and observe the latest measurement with metadata (e.g., timestamp, sensor ID, UCL/LCL, unit). > - Access a recent buffer of historical readings (trend_window) to detect any abnormal patterns. > - Apply standard SPC logic: > - Flag 6+ consecutive increases or decreases > - Identify 2 of 3 points near control limits > - Detect any value beyond UCL or LCL > - Summarize whether the process is stable or concerning, and explain which (if any) rule is being violated. > > Use the following output structure: > > @observe: [Brief acknowledgment of received data] > @reason: [Clear statement about trend status, SPC rule match, and rationale—based on the reasoning window] > @act: [Action recommendation—e.g. continue monitoring, notify supervisor, suggest shutdown prep] >

> Phrases—like @observe, @reason, and @notify—serve as explicit role markers. This provides scaffolding, so the LLM knows: "Ah, now I’m in the @reason phase—time to analyze."


- Agent Card
  
## Welcome to Control Chart Monitor V1

The Control Chart Monitoring Agent is designed to evaluate real-time sensor readings for process stability using SPC logic. By analyzing a short-term buffer of recent values (the *reasoning window*), it detects trends, rule violations, and potential recovery patterns—offering structured recommendations for process oversight.

### Configuration:

* Use the `Gemini-Pro` model or compatible LLM.
* Memory setup: Connect a `Memory Buffer Window` node with a sliding history of 5–7 turns.
* Prompt template: Incorporate the updated system message with `@observe`, `@reason`, and `@act` structure.
* Format input as pasted JSON samples via chat trigger or webhook.

### Instructions:

* Paste sensor data in this format:
  ```json
  {
    "sensor": "vibration_motor_3A",
    "timestamp": "2025-06-18T11:47:09Z",
    "value": 0.89,
    "unit": "mm/s",
    "ucl": 0.90,
    "lcl": 0.50,
    "trend_window": [0.91, 0.94, 0.86, 0.89],
    "alert_enabled": true
  }
  ```

* The `trend_window` represents the agent's reasoning window—it is used to evaluate patterns over time.

### Results:

The agent produces a structured response:
- **@observe** confirms the current reading.
- **@reason** references the reasoning window to evaluate rule violations, reversals, or momentum shifts.
- **@act** recommends an action, such as monitoring, notifying a supervisor, or triggering alerts.

The agent demonstrates short-term memory, SPC rule reasoning, and contextual awareness—distinguishing between normal variation, escalation, and possible stabilization.
