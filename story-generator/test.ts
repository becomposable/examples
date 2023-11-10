import { StudioClient } from "@composableai/sdk"

const client = new StudioClient({
    apikey: "sk-ec54686e78643101d7133b95ea2c43c5",
    serverUrl: "https://studio-server-staging-33ykyezjaa-uc.a.run.app"
})

const projects = await client.projects.list();

console.log('Projects:');
for (const project of projects) {
    console.log(project.name + ': ' + project.id);
}

if (projects.length > 0) {
    console.log('Select project', projects[0].name);
    // set the target project
    client.project = projects[0].id;

    const interactions = await client.interactions.list();

    console.log('Interactions:');
    for (const interaction of interactions) {
        console.log(interaction.name + ': ' + interaction.id);
    }
}