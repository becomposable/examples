//#export 654df9de09676ad3b8631dc3 655c54c5a963a422f6a97890 @2024-02-28T17:58:55.969Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Generate Haiku input type
 */
export interface GenerateHaikuProps {
    topic: string;
    mood: string;
}

/**
 * Generate Haiku
short content generation
 */
export class GenerateHaiku extends InteractionBase<GenerateHaikuProps, any> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("655c54c5a963a422f6a97890", clientOrProps);
        this.client.project = this.projectId;
    }
}
