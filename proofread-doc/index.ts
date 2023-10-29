import { readFileSync, writeFileSync } from "fs";
import { encoding_for_model } from "tiktoken";
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

//call the interaction to proofread the content
async function proofread(content: string, tokenCount: number) {
    //instantiating the interaction
    const req = new ProofreadDocumentation();

    //launch the execution with a custom max_tokens
    //here you could also change the model or environment
    const res = req.execute({
        config: {
            max_tokens: 8000 - 200 - tokenCount, //200 to take prompt template into account
        },
        data: {
            current_doc: content,
        },
    });

    return res;
}

//count token using the GPT-4 tokenizer
function getTokenCount(text: string): number {
    const encoder = encoding_for_model("gpt-4");
    const tokens = encoder.encode(text);
    encoder.free();

    return tokens.length;
}

//date the updated file under <name>.updated.ext
function saveUpdateFile(originalName: string, content: string) {
    const parts = originalName.split(".");
    const ext = parts.pop();
    const newName = parts.join(".") + ".updated." + ext;
    console.log("Saving updated file: ", newName);
    writeFileSync(newName, content, "utf8");
}

async function main() {
    if (!file) {
        throw new Error("No file provided.");
    }
    const fileContent = readFileSync(file, "utf8");

    const tokenCount = getTokenCount(fileContent);
    console.log("Token Count: ", tokenCount);

    const res = await proofread(fileContent, tokenCount);
    console.log("Response: ");
    console.log("Received response in " + res.execution_time + "ms");
    console.log("Length of updated doc: " + res.result.updated_doc.length);
    console.log("Token used", JSON.stringify(res.token_use, null, 2));
    console.log("Summary of Changes: ", res.result.changes_summary);

    saveUpdateFile(file, res.result.updated_doc);

    return;
}

main();
