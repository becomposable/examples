//#export 652d77c65674c387e10594bd 65429c72cd28fb009c3fd1f3 @2023-11-20T20:30:05.563Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Verify Message input type
 */
export interface VerifyMessageProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    content: string;
}

/**
 * Verify Message result type
 */
export interface VerifyMessageResult {
    /**
     * Is the content correct and natural?
     */
    is_correct: boolean;
    /**
     * If the content is not correct, correct it here
     */
    correction?: string;
    /**
     * How important is the mistake? High means the sentence is not understandable, medium means the sentence is understandable but not natural, low means the sentence is natural but not perfect
     */
    importance: "low" | "medium" | "high";
    /**
     * Explain the mistake, in a short sentence, to the point
     */
    explanation?: string;
}

/**
 * Verify Message
 */
export class VerifyMessage extends InteractionBase<VerifyMessageProps, VerifyMessageResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("65429c72cd28fb009c3fd1f3", clientOrProps);
        this.client.project = this.projectId;
    }
}
