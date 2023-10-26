import { ExecutionRun } from '@composableai/studio';
import { GenerateStory, GenerateStoryProps, configure } from './interactions.js';

const apiKey = process.env.COMPOSABLE_PROMPTS_API_KEY;
const serverUrl = process.env.COMPOSABLE_PROMPTS_SERVER_URL || "http://localhost:8091";

if (!apiKey) {
    throw new Error("No API key provided.");
}

configure({
    apikey: apiKey,
    serverUrl: serverUrl
});

const writer = new GenerateStory();

//
const data: GenerateStoryProps = {
    type: "short story",
    interests: ["video games", "japan", "edo period"],
    length: 800,
    student_age: 17,
    study_language: "english",
    user_language: "english",
    student_name: "John",
};

//blocking execute, wait for the story to be generated
//const story = await writer.execute({data});

//let's stream instead

const onCompleted = (run: ExecutionRun) => {
    console.log("Final Story: ", run.result);
}

const onChunk = (chunk: string) => {

    console.log(chunk);

}

const story = writer.execute({data}, onCompleted, onChunk);


console.log(story);

