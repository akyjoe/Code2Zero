THECREATOLOGY — AI FOOTPRINT INSPECTOR
Prototype v0.1

A lightweight, browser-based prototype to explore the estimated environmental footprint of AI conversations.

PROJECT CONTEXT

This project accompanies TheCreatology article:

Build With AI, But Don’t Build a Bigger Climate Problem

https://www.thecreatology.com/build-with-ai-carbon-footprint.html

FEATURES

* Paste AI conversations for analysis.
* Estimate token usage using a character-based heuristic.
* Separate user and assistant messages when role labels are detected.
* Estimate electricity consumption (Wh).
* Estimate carbon emissions (g CO2e).
* Estimate water consumption (ml).
* Adjust environmental assumptions.
* Export results as JSON.

HOW TO USE

1. Download or clone this repository.
2. Open the HTML file in a modern browser.
3. Paste an AI conversation.
4. Adjust the environmental assumptions if required.
5. Click “Estimate footprint”.
6. Export the results as JSON.

PRIVACY

This is an experimental prototype.

All conversation processing happens locally in the user’s browser. No conversation data is transmitted to or stored on TheCreatology’s backend servers.

The tool does not connect to external AI provider APIs.

LIMITATIONS

* Token counts are approximate, not provider-reported.
* Environmental figures are scenario estimates, not actual measurements.
* The tool cannot access hidden prompts, model infrastructure or hardware telemetry.
* Results are not audited carbon accounting.
* Actual environmental impact varies by model, workload, data-centre efficiency, cooling systems and electricity sources.

FUTURE DEVELOPMENT

Potential improvements include:

* Model-specific tokenizers.
* Provider usage-log imports.
* Better documented environmental assumptions.
* AI platform integrations.
* In-chat environmental reporting.

ABOUT THECREATOLOGY

An experimental project under our #BuildWithAI initiative, encouraging more responsible and transparent AI adoption.

https://www.thecreatology.com/

Count the tokens. Show the carbon. Grow something green.

#BuildWithAI #ResponsibleAI #GreenAI