import { readFileSync } from "fs";
import { ProofreadDocumentation, configure } from "./interactions.js";

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
  const proofreader = new ProofreadDocumentation();
  const res = await proofreader.execute({
    data: {
      current_doc: content,
    },
  });
  return res;
}

function main() {
  if (!file) {
    throw new Error("No file provided.");
  }

  const fileContent = readFileSync(file, "utf8");

  const res = proofread(fileContent);

  const output = JSON.stringify(res, null, 2);

  console.log(output);

  return;
}

main();
