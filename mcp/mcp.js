#!/usr/bin/env node
// mcp.js — TheCreatology Carbon Footprint Inspector (v0.2)
// Zero-auth stdio MCP server. Exposes one tool, estimate_ai_footprint,
// backed by the same pure-JavaScript logic used by index.html (formula.js).
// Run with: npx -y github:akyjoe/code2zero thecreatology-carbon-footprint

import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { estimateFootprint, DEFAULT_FACTORS } from '../formula.js';

const server = new Server(
  { name: 'TheCreatology Carbon Footprint Inspector', version: '0.2.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'estimate_ai_footprint',
      description:
        'Estimate the token, electricity, carbon and water footprint of an AI conversation. ' +
        'Calculations are scenario-based estimates (see /api/factors.json), not measurements.',
      inputSchema: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'AI conversation text to estimate. Role labels (User:, Assistant:, etc.) split user vs. assistant tokens.',
          },
          charsPerToken: {
            type: 'number',
            description: 'Characters per estimated token. Default: 4.',
          },
          whPerToken: {
            type: 'number',
            description: 'Watt-hours of electricity per estimated token. Default: 0.001.',
          },
          co2PerWh: {
            type: 'number',
            description: 'Grams of CO2e per watt-hour (grid average). Default: 0.45.',
          },
          waterMlPerWh: {
            type: 'number',
            description: 'Millilitres of water per watt-hour. Default: 2.',
          },
        },
        required: ['text'],
        additionalProperties: false,
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'estimate_ai_footprint') {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const args = z
    .object({
      text: z.string(),
      charsPerToken: z.number().optional(),
      whPerToken: z.number().optional(),
      co2PerWh: z.number().optional(),
      waterMlPerWh: z.number().optional(),
    })
    .parse(request.params.arguments ?? {});

  const custom = {};
  for (const key of ['charsPerToken', 'whPerToken', 'co2PerWh', 'waterMlPerWh']) {
    if (args[key] !== undefined) custom[key] = args[key];
  }

  try {
    const result = estimateFootprint(args.text, custom);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      isError: true,
      content: [{ type: 'text', text: `Estimation failed: ${err.message}` }],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
