//#export 654df9de09676ad3b8631dc3 6554ce1e7eae1c28ef5f3cf3 @2023-11-20T20:36:08.380Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";


/**
 * SimpleTest
 */
export class SimpleTest extends InteractionBase<any, any> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6554ce1e7eae1c28ef5f3cf3", clientOrProps);
        this.client.project = this.projectId;
    }
}
