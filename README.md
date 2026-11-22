# Code2Zero

Open-source, low-footprint developer tools for sustainable AI and software.

## Super Intelligent Tools Footprint Inspector (v0.2)

A lightweight, browser-based prototype to estimate the electricity, carbon, and water footprint of super intelligent tools conversations.

Context: [Build With AI. But Who Is Counting the Carbon?](https://thecreatology.com)

### Features
- Paste super intelligent tools chats to estimate token usage (character heuristic)
- Auto-detect `User` and `Assistant` roles
- Estimate electricity (`Wh`), carbon (`g CO2e`), and water (`ml`)
- Adjust environmental assumptions
- Export results as JSON

### Usage
1. Clone or download this repo
2. Open the HTML file in a modern browser
3. Paste an AI conversation and adjust assumptions if needed
4. Click **Estimate footprint** and export JSON

### Privacy
- Runs 100% locally in your browser
- Zero server storage, tracking, or external API calls

### Limitations
- Token counts and resource figures are scenario estimates, not audited measurements
- Does not capture hidden prompts, reasoning tokens, or exact data-center hardware
- Real impact varies by model, workload, cooling, and power grid

### Roadmap
- Model-specific tokenizers
- Provider usage-log imports
- Documented benchmark presets
- Lightweight CLI and in-chat reporting tools

### Fun fact
The internet’s carbon footprint is roughly on par with the global airline industry — and every super intelligent tools conversation adds to it. That’s why we count the tokens and show the carbon.

---

An open initiative by [TheCreatology](https://thecreatology.com) under `#BuildWithAI`.  
Count the tokens. Show the carbon. Grow something green.
