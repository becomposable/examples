import { readFileSync } from "fs";
import { ProofreadDocumentation, configure } from "./interactions.js";
const apiKey = process.env.COMPOSABLE_PROMPTS_API_KEY;
const serverUrl = process.env.COMPOSABLE_PROMPTS_SERVER_URL || undefined;
const stream = false;
const file = process.argv[2];
if (!apiKey) {
    throw new Error("No API key provided.");
}
configure({
    apikey: apiKey,
    serverUrl: serverUrl,
});
async function proofread(content) {
    return await new ProofreadDocumentation().execute({
        data: {
            current_doc: content,
        },
    });
}
async function main() {
    const file = "~/Code/llm-studio/apps/docs/src/app/interactions/page.mdx";
    if (!file) {
        throw new Error("No file provided.");
    }
    const fileContent = readFileSync(file, "utf8");
    const res = await proofread(fileContent);
    console.log(res.result.updated_doc);
    return;
}
main();
