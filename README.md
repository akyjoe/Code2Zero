# 🌱 Code2Zero

**Open-source sustainability tools for the next generation of builders and vibe coders.**

We count tokens, track productivity, and compare models—now it’s time to count what our code costs the planet. **Code2Zero** is a public collection of lightweight, planet-friendly developer tools designed to make the invisible environmental cost of software and AI visible, measurable, and actionable.

---

## 🔍 Flagship Tool: AI Footprint Inspector (`v0.1 Prototype`)

A lightweight, zero-dependency, browser-based tool to explore the estimated environmental footprint of your AI conversations.

### Project Context
This tool accompanies TheCreatology’s article:  
📖 **[Build With AI. But Who Is Counting the Carbon?](https://www.thecreatology.com/build-with-ai-carbon-footprint.html)**

### ✨ Features
- **Instant Conversation Analysis:** Paste any AI chat transcript for immediate breakdown.
- **Token Estimation:** Calculates approximate token usage using a fast, character-based heuristic.
- **Role Detection:** Automatically separates `User` and `Assistant` messages when role labels are present.
- **Resource Footprint Modeling:**
  - ⚡ **Electricity consumption** (`Wh`)
  - 🌍 **Carbon emissions** (`g CO₂e`)
  - 💧 **Water consumption** (`ml`)
- **Customizable Assumptions:** Adjust underlying energy, grid carbon intensity, and water-usage multipliers to test different scenarios.
- **JSON Export:** Download your session estimates as structured JSON for logging or reporting.

---

## 🚀 Quick Start

No build steps, API keys, or package installs required:

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com
   ```
2. **Open the HTML file** (`index.html`) directly in any modern browser.
3. **Paste** an AI conversation into the input box.
4. *(Optional)* **Adjust** the environmental assumptions to match your region or model profile.
5. Click **“Estimate footprint”**.
6. **Export** the results as JSON.

---

## 🔒 Privacy First

- **100% Local Processing:** Everything runs client-side inside your browser.
- **Zero Data Collection:** No prompts, conversations, or outputs are ever transmitted to or stored on TheCreatology’s servers.
- **Offline Friendly:** The tool does not connect to external AI provider APIs.

---

## ⚠️ Limitations & Methodology Caveats

Transparency matters as much as the numbers:

- **Approximate Token Counts:** Token figures rely on character heuristics rather than model-specific tokenizers or provider-reported telemetry.
- **Scenario Estimates Only:** Electricity, carbon, and water outputs are educational estimates, **not** audited carbon accounting or hardware measurements.
- **Hidden Compute:** The inspector cannot account for hidden system prompts, reasoning/thinking tokens, image/video generation, or exact data-center hardware.
- **Real-World Variance:** Actual environmental impact varies significantly depending on model architecture, workload, data-center Power Usage Effectiveness (PUE), cooling systems, and local power grids.

---

## 🗺️ Roadmap & Future Tools

We’re building **Code2Zero** in the open for young developers who want to ship fast without cooking the planet. Upcoming improvements and tools include:

- [ ] **Model-Specific Tokenizers:** Accurate token counting for popular open and frontier models.
- [ ] **Usage-Log Importers:** Drag-and-drop support for exported ChatGPT, Claude, and Gemini history files.
- [ ] **Documented Benchmarks:** Preset profiles grounded in published research and regional grid data.
- [ ] **CLI & Vibe-Coding Helpers:** Lightweight terminal scripts and browser extensions for real-time footprint tracking.
- [ ] **Actionable Offsets & Green Credits:** Connecting usage insights with verified native reforestation and green-credit initiatives.

Contributions, issues, and new green dev tools are welcome!

---

## 🏢 About TheCreatology

**Code2Zero** is an open-source initiative by **[TheCreatology](https://www.thecreatology.com/)** under **#BuildWithAI**—encouraging transparent, responsible, and sustainable AI adoption.

> **Count the tokens. Show the carbon. Grow something green.**

`#Code2Zero` `#BuildWithAI` `#ResponsibleAI` `#GreenAI` `#SustainableSoftware`
