import { StudioClient } from '@composableai/studio';
import { GenerateStory } from './interactions';


const client = new StudioClient('https://api.composableprompts.com', {
    apikey: 'YOUR_API_KEY',
    projectId: 'YOUR_PROJECT_ID'
})

const info = await client.account.info();

const writer = new GenerateStory(client);

console.log(info);