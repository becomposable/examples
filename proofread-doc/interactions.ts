//#export 6534dc4c9f9ba90d2dadbe9d @2023-10-29T15:16:15.493Z
// This is a generated file. Do not edit.

import { StudioClient, InteractionBase } from "@composableai/studio";

const projectId = '6534dc4c9f9ba90d2dadbe9d';

let _client: StudioClient | undefined;
export function configure(opts: {
    serverUrl?: string,
    apikey?: string,
    projectId?: string,
    onRequest?: (url: string, init: RequestInit) => void,
    onResponse?: (response: Response) => void
}) {
    return (_client = new StudioClient({ projectId, ...opts }));
}
const getClient = () => _client;
export { getClient, projectId }

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
 * Proofread Documentation
 */
export class ProofreadDocumentation extends InteractionBase<ProofreadDocumentationProps, ProofreadDocumentationResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("653a24a0d73c5ac92045e0c9", client || _client);
    }
}

/**
 * Generate Interface Doc
 */
export class GenerateInterfaceDoc extends InteractionBase<GenerateInterfaceDocProps, GenerateInterfaceDocResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("653568ac9f9ba90d2dadc1a6", client || _client);
    }
}

/**
 * Update API Documentation
 */
export class UpdateAPIDocumentation extends InteractionBase<UpdateAPIDocumentationProps, UpdateAPIDocumentationResult> {
    project = projectId;
    constructor(client?: StudioClient) {
        super ("6534ec0c9f9ba90d2dadbecc", client || _client);
    }
}
