import { StudioClient, InteractionBase } from "@dglabs/client";

const projectId = '652d4affb9f2f5d2c7a73820';

let _client: StudioClient | undefined;
export function configure(opts: {
    serverUrl?: string,
    apikey?: string,
    projectId?: string,
}) {
    return (_client = new StudioClient({ projectId, ...opts }));
}
const getClient = () => _client;
export { getClient, projectId }

/**
 * Simple Story Gen result type
 */
export interface SimpleStoryGenResult {
    story: string;
    heroname: string;
    atmosphere: string;
}

/**
 * Verify Language input type
 */
export interface VerifyLanguageProps {
    student_name: string;
    student_age: number;
    interests: string[];
    user_language: string;
    study_language: string;
    content: string;
}

/**
 * Verify Language result type
 */
export interface VerifyLanguageResult {
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
 * Generate Story input type
 */
export interface GenerateStoryProps {
    student_name: string;
    student_age: number;
    interests: string[];
    user_language: string;
    study_language: string;
    type: string;
    topic?: string;
    level?: string;
    length: number;
    style?: string;
}

/**
 * Simple Story Gen
 */
export class SimpleStoryGen extends InteractionBase<any, SimpleStoryGenResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("652ff88b3f120b01a24b8c0e", client || _client);
    }
}

/**
 * Verify Language
 */
export class VerifyLanguage extends InteractionBase<VerifyLanguageProps, VerifyLanguageResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("652d7e6a0869fcbe0d753669", client || _client);
    }
}

/**
 * Generate Story
 */
export class GenerateStory extends InteractionBase<GenerateStoryProps, any> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("652e110b3f120b01a24b8a1a", client || _client);
    }
}
