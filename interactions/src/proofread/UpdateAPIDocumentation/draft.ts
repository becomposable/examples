//#export 6534dc4c9f9ba90d2dadbe9d 6534ec0c9f9ba90d2dadbecc @2023-11-20T20:33:41.475Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Update API Documentation input type
 */
export interface UpdateAPIDocumentationProps {
    ts_interface: string;
    client_api_class: string;
    current_doc: string;
}

/**
 * Update API Documentation result type
 */
export interface UpdateAPIDocumentationResult {
    updated_doc: string;
    main_changes: string[];
}

/**
 * Update API Documentation
 */
export class UpdateAPIDocumentation extends InteractionBase<UpdateAPIDocumentationProps, UpdateAPIDocumentationResult> {
    readonly projectId = "6534dc4c9f9ba90d2dadbe9d";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6534ec0c9f9ba90d2dadbecc", clientOrProps);
        this.client.project = this.projectId;
    }
}
