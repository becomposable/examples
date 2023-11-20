//#export 6534dc4c9f9ba90d2dadbe9d 653a24a0d73c5ac92045e0c9 @2023-11-20T20:33:41.475Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Proofread Documentation input type
 */
export interface ProofreadDocumentationProps {
    current_doc: string;
}

/**
 * Proofread Documentation result type
 */
export interface ProofreadDocumentationResult {
    updated_doc: string;
    changes_summary: string;
}

/**
 * Proofread Documentation
 */
export class ProofreadDocumentation extends InteractionBase<ProofreadDocumentationProps, ProofreadDocumentationResult> {
    readonly projectId = "6534dc4c9f9ba90d2dadbe9d";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("653a24a0d73c5ac92045e0c9", clientOrProps);
        this.client.project = this.projectId;
    }
}
