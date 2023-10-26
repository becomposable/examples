import { readFileSync } from "fs";
import { ProofreadDocumentation, configure, getClient } from "./interactions.js";

const apiKey = process.env.COMPOSABLE_PROMPTS_API_KEY;
const serverUrl =
  process.env.COMPOSABLE_PROMPTS_SERVER_URL || "http://localhost:8091";
const stream = false;

const file = process.argv[2];

if (!apiKey) {
  throw new Error("No API key provided.");
}

configure({
  apikey: apiKey,
  serverUrl: serverUrl,
});

async function proofread(content: string) {
  return await new ProofreadDocumentation().execute({
    data: {
      current_doc: content,
    },
  });
}

async function main() {
  if (!file) {
    throw new Error("No file provided.");
  }
  const fileContent = readFileSync(file, "utf8");
  const res = await proofread(fileContent);
  console.log(res.result);
  return;
}

main();
