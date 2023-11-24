import { StudioClient } from "@composableai/sdk"

const client = new StudioClient({
    apikey: "sk-ec54686e78643101d7133b95ea2c43c5",
    projectId: "654df9de09676ad3b8631dc3",
    serverUrl: "http://localhost:8091"
})

const data = await client.interactions.generateTestData("6554cf617eae1c28ef5f3d40", {
    count: 4,
    config: {
        environment: "654dfa3109676ad3b8631e24",
        model: "gpt-4"
    }
});

console.log(data);