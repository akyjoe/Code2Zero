// formula.js — TheCreatology Carbon Footprint Inspector (v0.2)
// Shared pure-JavaScript calculation logic. Single source of truth used by
// both index.html (<script type="module">) and mcp.js (Node.js).
// No DOM, no Node-only APIs: runs natively in browsers and Node.js.

// Role labels that split a conversation into user vs. assistant portions.
const USER_LABELS = /^(user|human|you)\s*:\s*/i;
const ASSISTANT_LABELS = /^(assistant|ai|chatgpt|claude|gemini)\s*:\s*/i;

// Default environmental assumptions. Scenario estimates only — not provider
// measurements and not audited carbon accounting.
export const DEFAULT_FACTORS = {
  charsPerToken: 4,        // rough heuristic: ~1 token per 4 characters
  whPerToken: 0.001,       // watt-hours of electricity per estimated token
  co2PerWh: 0.45,          // grams of CO2e per watt-hour (grid average)
  waterMlPerWh: 2.0,       // millilitres of water per watt-hour
};

/**
 * Estimate the token, electricity, carbon and water footprint of a text.
 *
 * @param {string} text - Conversation text to estimate.
 * @param {object} [customFactors] - Override any default factors.
 * @returns {object} { tokens: { total, user, assistant }, electricity_wh, carbon_gco2e, water_ml, factors }
 */
export function estimateFootprint(text, customFactors = {}) {
  const factors = { ...DEFAULT_FACTORS, ...customFactors };
  const charsPerToken = Math.max(Number(factors.charsPerToken) || 1, 1);
  const whPerToken = Number(factors.whPerToken) || 0;
  const co2PerWh = Number(factors.co2PerWh) || 0;
  const waterMlPerWh = Number(factors.waterMlPerWh) || 0;

  const countTokens = s => {
    s = String(s ?? '').trim();
    return s ? Math.ceil(s.length / charsPerToken) : 0;
  };

  const lines = String(text ?? '').split(/\r?\n/);
  let userText = [];
  let assistantText = [];
  let otherText = [];
  let current = null;
  let hasRoles = false;

  for (const line of lines) {
    if (USER_LABELS.test(line)) {
      hasRoles = true;
      current = 'user';
      userText.push(line.replace(USER_LABELS, ''));
    } else if (ASSISTANT_LABELS.test(line)) {
      hasRoles = true;
      current = 'assistant';
      assistantText.push(line.replace(ASSISTANT_LABELS, ''));
    } else if (current === 'user') {
      userText.push(line);
    } else if (current === 'assistant') {
      assistantText.push(line);
    } else {
      otherText.push(line);
    }
  }

  let totalTokens, userTokens, assistantTokens;
  if (hasRoles) {
    // Text before the first role label is attributed to the user side.
    userTokens = countTokens([...userText, ...otherText].join('\n'));
    assistantTokens = countTokens(assistantText.join('\n'));
    totalTokens = userTokens + assistantTokens;
  } else {
    totalTokens = countTokens(text);
    userTokens = null;
    assistantTokens = null;
  }

  const electricityWh = totalTokens * whPerToken;
  const carbonGco2e = electricityWh * co2PerWh;
  const waterMl = electricityWh * waterMlPerWh;

  return {
    tokens: { total: totalTokens, user: userTokens, assistant: assistantTokens, hasRoles },
    electricity_wh: electricityWh,
    carbon_gco2e: carbonGco2e,
    water_ml: waterMl,
    factors,
  };
}
