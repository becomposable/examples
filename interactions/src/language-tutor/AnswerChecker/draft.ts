//#export 652d77c65674c387e10594bd 653ff24550279bbc4d26d892 @2023-11-20T20:30:05.563Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * AnswerChecker input type
 */
export interface AnswerCheckerProps {
    student_name: string;
    student_age?: number;
    interests?: string[];
    study_language: string;
    user_language: string;
    story: string;
    answers: {
        question: string;
        answer: string;
    }[];
}

/**
 * AnswerChecker result type
 */
export interface AnswerCheckerResult {
    answers: {
        question: string;
        /**
         * The user's answer to the question
         */
        answer: string;
        /**
         * Is the answer correct?
         */
        is_correct: boolean;
        /**
         * The correct answer if the user's answer is incorrect
         */
        correct_answer?: string;
    }[];
    /**
     * The final score of the user
     */
    score: number;
}

/**
 * AnswerChecker
 */
export class AnswerChecker extends InteractionBase<AnswerCheckerProps, AnswerCheckerResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("653ff24550279bbc4d26d892", clientOrProps);
        this.client.project = this.projectId;
    }
}
