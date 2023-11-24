//#export 654df9de09676ad3b8631dc3 6554cf617eae1c28ef5f3d40 @2023-11-21T12:07:37.264Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Test input type
 */
export interface TestProps {
    object: string;
}

/**
 * Test result type
 */
export interface TestResult {
    color: string;
}

/**
 * Test
 */
export class Test extends InteractionBase<TestProps, TestResult> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6554cf617eae1c28ef5f3d40", clientOrProps);
        this.client.project = this.projectId;
    }
}
