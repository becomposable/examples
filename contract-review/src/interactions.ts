//#export 654df9de09676ad3b8631dc3 @2023-11-10T19:16:28.842Z
// This is a generated file. Do not edit.

import { InteractionBase, StudioClient, StudioClientProps } from "@composableai/sdk";

const projectId = '654df9de09676ad3b8631dc3';

let _client: StudioClient | undefined;
export function configure (opts: StudioClientProps) {
    return (_client = new StudioClient({ projectId, ...opts }));
}
const getClient = () => _client;
export { getClient, projectId };

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
}


/**
 * Review Contract
 */
export class ReviewContract extends InteractionBase<ReviewContractProps, ReviewContractResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super("654dfa4d09676ad3b8631e39", client || _client);
    }
}
