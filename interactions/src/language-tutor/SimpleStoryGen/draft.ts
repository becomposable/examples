//#export 652d77c65674c387e10594bd 652ff6fbd0344fac4c2c15c7 @2023-11-20T20:30:05.563Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Simple Story Gen input type
 */
export interface SimpleStoryGenProps {
    style: number;
    user_age: number;
    interests: string[];
}

/**
 * Simple Story Gen result type
 */
export interface SimpleStoryGenResult {
    story: string;
    mainCharacter: string;
    theme: string;
    atmosphere: string;
}

/**
 * Simple Story Gen
 */
export class SimpleStoryGen extends InteractionBase<SimpleStoryGenProps, SimpleStoryGenResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("652ff6fbd0344fac4c2c15c7", clientOrProps);
        this.client.project = this.projectId;
    }
}
