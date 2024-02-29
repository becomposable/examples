//#export 652d77c65674c387e10594bd 652e0dfcda623bded923e678 @2024-02-28T17:58:46.891Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Generate a Story input type
 */
export interface GenerateAStoryProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    type: string;
    topic?: string;
    level?: string;
    length: number;
    style?: string;
}

/**
 * Generate a Story
 */
export class GenerateAStory extends InteractionBase<GenerateAStoryProps, any> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("652e0dfcda623bded923e678", clientOrProps);
        this.client.project = this.projectId;
    }
}
