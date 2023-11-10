import { StudioClient } from "@composableai/sdk"

const client = new StudioClient({
    apikey: "sk-ec54686e78643101d7133b95ea2c43c5",
    projectId: "652d77c65674c387e10594bd",
    serverUrl: "https://studio-server-staging-33ykyezjaa-uc.a.run.app"
})


const r = await client.runs.search({
    tags: ['doc', 'test']
})

console.log(r.map(run => run.id));


// const interactions = await client.interactions.list();

// for (const interaction of interactions) {
//     console.log(interaction.name + ': ' + interaction.id);
// }

// client.sessionName = 'doc';

// const story = interactions[2];
// const run = await client.interactions.execute(story.id, {
//     data: {
//         type: "short story",
//         interests: ["video games", "japan", "edo period"],
//         length: 800,
//         student_age: 17,
//         study_language: "english",
//         user_language: "english",
//         student_name: "John",
//     },
//     tags: 'test'
// });

// console.log(run.result);
