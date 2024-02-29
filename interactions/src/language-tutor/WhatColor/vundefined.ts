//#export 654df9de09676ad3b8631dc3 6572a81c398833266e536b62 @2024-02-28T17:58:55.976Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * What Color input type
 */
export interface WhatColorProps {
    object: string;
}

/**
 * What Color result type
 */
export interface WhatColorResult {
    color: string;
}

/**
 * What Color
reply with what is the color of the object requested 
 */
export class WhatColor extends InteractionBase<WhatColorProps, WhatColorResult> {
    readonly projectId = "654df9de09676ad3b8631dc3";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("6572a81c398833266e536b62", clientOrProps);
        this.client.project = this.projectId;
    }
}
