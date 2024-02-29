import { StudioClient } from "@composableai/sdk";
import {
  GenerateAStory,
  GenerateAStoryProps,
} from "@composableai-examples/interactions/lib/language-tutor/GenerateAStory/index.js";
import "dotenv/config";
import { argv } from "process";

const apiKey = process.env.COMPOSABLE_PROMPT_API_KEY;
const serverUrl =
  process.env.COMPOSABLE_PROMPT_SERVER_URL || "http://localhost:8091";
const stream = argv[2] === "stream" ? true : false;

if (!apiKey) {
  throw new Error("No API key provided.");
}

const client = new StudioClient({
  apikey: apiKey,
  projectId: "652d77c65674c387e10594bd",
});

const interactionId = "652e0dfcda623bded923e678";

const payload = {
  config: {
    model: "gpt-3.5-turbo",
  },
  data: {
    current_doc: "hello world",
  },
};

if (!stream) {
  const res = await client.interactions.execute(interactionId, payload);
  console.log("Response: ");
  console.log(JSON.stringify(res.result, null, 2));

} else {
  const onChunk = (chunk: string) => {
    process.stdout.write(chunk);
  };
  const story = await client.interactions.execute(interactionId, payload, onChunk);
  //console.log("Final Story: ", story.result);
}

// ========== The same executioin but using the generated interaction class
console.log();
console.log('============ Same execution but using the generated interaction class:');
console.log();

const writer = new GenerateAStory({
  apikey: apiKey,
  serverUrl: serverUrl,
});

//
const data: GenerateAStoryProps = {
  type: "short story",
  interests: ["video games", "japan", "edo period"],
  length: 800,
  student_age: 17,
  study_language: "english",
  user_language: "english",
  student_name: "John",
};

if (!stream) {
  //blocking execute, wait for the story to be generated
  const story = await writer.execute({
    config: {
      //environment: "60f1b0a0a9b9a90d2dadbef0",
      model: "gpt-3.5-turbo",
    },
    data: data,
  });
  console.log("Story: \n" + JSON.stringify(story));
} else {
  //let's stream instead
  const onChunk = (chunk: string) => {
    process.stdout.write(chunk);
  };
  const story = await writer.execute({ data }, onChunk);
  //console.log("Final Story: ", story.result);
}
