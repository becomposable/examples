//#export 652d77c65674c387e10594bd 6542952ecd28fb009c3fd062 @2024-02-28T17:58:46.907Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Generate Questions input type
 */
export interface GenerateQuestionsProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    content: string;
}

/**
 * Generate Questions result type
 */
export interface GenerateQuestionsResult {
    questions?: {
        question?: string;
    }[];
}

/**
 * Generate Questions
 */
export class GenerateQuestions extends InteractionBase<GenerateQuestionsProps, GenerateQuestionsResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6542952ecd28fb009c3fd062", clientOrProps);
        this.client.project = this.projectId;
    }
}
