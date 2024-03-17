//#export 654df9de09676ad3b8631dc3 654dfa4d09676ad3b8631e39 @2024-03-17T15:19:32.745Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Review Contract input type
 */
export interface ReviewContractProps {
    contract: string;
    policy: string;
}

/**
 * Review Contract result type
 */
export interface ReviewContractResult {
    is_compliant: boolean;
    customer_name: string;
    service_provided: string;
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
        super ("654dfa4d09676ad3b8631e39", clientOrProps);
        this.client.project = this.projectId;
    }
}
