import { StudioClient } from "@composableai/sdk"

const client = new StudioClient({
    apikey: "sk-ec54686e78643101d7133b95ea2c43c5",
    projectId: "654df9de09676ad3b8631dc3",
    serverUrl: "http://localhost:8091"
})

// const runs = await client.runs.list({
//     limit: 50,
//     filters: {
//         interaction: "6554cf617eae1c28ef5f3d40",
//         tag: "cli"
//     }
// });

// //console.log(runs[0]);
// const run = await client.runs.retrieve(runs[0].id);

// console.log(run);

const runs = await client.runs.search({
    limit: 10,
    query: "parameters.object:flower AND result.color:yellow",
});


console.log(runs.map(r => r.parameters.object + ' ' + r.result.color));

