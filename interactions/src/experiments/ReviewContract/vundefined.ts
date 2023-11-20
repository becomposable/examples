//#export 654df9de09676ad3b8631dc3 654e592f1501f6d3e4f97a22 @2023-11-20T20:36:08.494Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Review Contract result type
 */
export interface ReviewContractResult {
    is_compliant: boolean;
    issues: {
        importance: string;
        description: string;
        suggested_remediation: string;
    }[];
}

/**
 * Review Contract
 */
export class ReviewContract extends InteractionBase<any, ReviewContractResult> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("654e592f1501f6d3e4f97a22", clientOrProps);
        this.client.project = this.projectId;
    }
}
