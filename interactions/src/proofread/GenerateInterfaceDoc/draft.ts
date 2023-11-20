//#export 6534dc4c9f9ba90d2dadbe9d 653568ac9f9ba90d2dadc1a6 @2023-11-20T20:33:41.475Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Generate Interface Doc input type
 */
export interface GenerateInterfaceDocProps {
    ts_interface: string;
}

/**
 * Generate Interface Doc result type
 */
export interface GenerateInterfaceDocResult {
    interface_doc: string;
    mock_object: string;
}

/**
 * Generate Interface Doc
 */
export class GenerateInterfaceDoc extends InteractionBase<GenerateInterfaceDocProps, GenerateInterfaceDocResult> {
    readonly projectId = "6534dc4c9f9ba90d2dadbe9d";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("653568ac9f9ba90d2dadc1a6", clientOrProps);
        this.client.project = this.projectId;
    }
}
