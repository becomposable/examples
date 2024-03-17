//#export 654df9de09676ad3b8631dc3 65f558a6fbdcc28ee99b6f91 @2024-03-17T15:19:32.745Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Extract Key Terms input type
 */
export interface ExtractKeyTermsProps {
    contract: string;
}

/**
 * Extract Key Terms result type
 */
export interface ExtractKeyTermsResult {
    key_terms: {
        term_summary: string;
        is_standard: boolean;
        start: number;
        end: number;
        first_unique_words: string;
    }[];
    customer_name: string;
    vendor_name: string;
}

/**
 * Extract Key Terms
 */
export class ExtractKeyTerms extends InteractionBase<ExtractKeyTermsProps, ExtractKeyTermsResult> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("65f558a6fbdcc28ee99b6f91", clientOrProps);
        this.client.project = this.projectId;
    }
}
