import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "mcp-remote", "https://stitch.googleapis.com/mcp", "--header", "X-Goog-Api-Key: REDACTED_API_KEY"]
});

const client = new Client({
  name: "test-client",
  version: "1.0.0"
}, {
  capabilities: {
    prompts: {},
    resources: {},
    tools: {}
  }
});

async function main() {
  await client.connect(transport);
  
  const prompts = await client.listPrompts();
  console.log("Prompts:", JSON.stringify(prompts, null, 2));

  const tools = await client.listTools();
  console.log("Tools:", JSON.stringify(tools, null, 2));

  const resources = await client.listResources();
  console.log("Resources:", JSON.stringify(resources, null, 2));

  await transport.close();
}

main().catch(console.error);
