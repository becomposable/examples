//#export 654df9de09676ad3b8631dc3 659ffd5b7a76ba1033febd3f @2024-02-28T17:58:55.976Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Review Contract input type
 */
export interface ReviewContractProps {
    contract: string;
    policy: string;
    customer_name: string;
    service_description: string;
}

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
    exclusivity_period_in_year: number;
}

/**
 * Review Contract
 */
export class ReviewContract extends InteractionBase<ReviewContractProps, ReviewContractResult> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("659ffd5b7a76ba1033febd3f", clientOrProps);
        this.client.project = this.projectId;
    }
}
