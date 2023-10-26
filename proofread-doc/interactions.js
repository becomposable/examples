import { InteractionBase, StudioClient } from "@composableai/studio";
const projectId = "6534dc4c9f9ba90d2dadbe9d";
let _client;
export function configure(opts) {
    return (_client = new StudioClient({ projectId, ...opts }));
}
const getClient = () => _client;
export { getClient, projectId };
/**
 * Proofread Documentation
 */
export class ProofreadDocumentation extends InteractionBase {
    project = projectId;
    constructor(client) {
        super("653a24a0d73c5ac92045e0c9", client || _client);
    }
}
/**
 * Generate Interface Doc
 */
export class GenerateInterfaceDoc extends InteractionBase {
    project = projectId;
    constructor(client) {
        super("653568ac9f9ba90d2dadc1a6", client || _client);
    }
}
/**
 * Update API Documentation
 */
export class UpdateAPIDocumentation extends InteractionBase {
    project = projectId;
    constructor(client) {
        super("6534ec0c9f9ba90d2dadbecc", client || _client);
    }
}
