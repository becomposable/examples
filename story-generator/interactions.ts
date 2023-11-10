//#export 652d2f36cf932ffa016ee653 @2023-11-06T12:11:03.126Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

const projectId = '652d2f36cf932ffa016ee653';

let _client: StudioClient | undefined;
export function configure(opts: StudioClientProps) {
    return (_client = new StudioClient({ projectId, ...opts }));
}
const getClient = () => _client;
export { getClient, projectId }

/**
 * TestChat input type
 */
export interface TestChatProps {
    language: string;
    age: number;
    chat: {
        role: "assistant" | "user";
        content: string;
    }[];
}

/**
 * Test GPT input type
 */
export interface TestGPTProps {
    name: string;
}

/**
 * Test GPT result type
 */
export interface TestGPTResult {
    questions: string[];
}

/**
 * TestChat
 */
export class TestChat extends InteractionBase<TestChatProps, any> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("6540f8dc001f361221102de0", client || _client);
    }
}

/**
 * Test GPT
 */
export class TestGPT extends InteractionBase<TestGPTProps, TestGPTResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("652e5a4a48400b23280ca56a", client || _client);
    }
}
