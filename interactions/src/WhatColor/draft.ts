//#export 654df9de09676ad3b8631dc3 655775f9108a03f326f30d89 @2024-01-11T14:42:45.201Z
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
        super ("655775f9108a03f326f30d89", clientOrProps);
        this.client.project = this.projectId;
    }
}
