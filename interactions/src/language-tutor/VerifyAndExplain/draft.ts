//#export 652d77c65674c387e10594bd 652e0cfeda623bded923e5f6 @2023-11-20T20:30:05.548Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Verify and Explain input type
 */
export interface VerifyAndExplainProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    verifyOnly: boolean;
    content: string;
}

/**
 * Verify and Explain
 */
export class VerifyAndExplain extends InteractionBase<VerifyAndExplainProps, any> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("652e0cfeda623bded923e5f6", clientOrProps);
        this.client.project = this.projectId;
    }
}
