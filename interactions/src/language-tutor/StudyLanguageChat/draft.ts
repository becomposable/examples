//#export 652d77c65674c387e10594bd 6540c1c250279bbc4d26dbee @2023-11-20T20:30:05.548Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * StudyLanguageChat input type
 */
export interface StudyLanguageChatProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    chat: {
        role: "assistant" | "user";
        content: string;
    }[];
}

/**
 * StudyLanguageChat
 */
export class StudyLanguageChat extends InteractionBase<StudyLanguageChatProps, any> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6540c1c250279bbc4d26dbee", clientOrProps);
        this.client.project = this.projectId;
    }
}
