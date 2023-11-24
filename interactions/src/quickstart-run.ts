import { Test } from "./experiments/Test/index.js"

const test = new Test({
    apikey: "sk-ec54686e78643101d7133b95ea2c43c5",
    serverUrl: "http://localhost:8091"
});

const run = await test.execute({
    data: { object: "sky" }
});

console.log(run.result);
