//#export 652d77c65674c387e10594bd 65429a26cd28fb009c3fd15b @2023-11-20T20:30:05.563Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Generate Story Options input type
 */
export interface GenerateStoryOptionsProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
}

/**
 * Generate Story Options result type
 */
export interface GenerateStoryOptionsResult {
    types?: string[];
    topics?: string[];
    styles?: string[];
    levels?: string[];
}

/**
 * Generate Story Options
 */
export class GenerateStoryOptions extends InteractionBase<GenerateStoryOptionsProps, GenerateStoryOptionsResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("65429a26cd28fb009c3fd15b", clientOrProps);
        this.client.project = this.projectId;
    }
}
