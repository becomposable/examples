import { ExecutionRun, InteractionBase } from "@composableai/studio";
import { useMemo } from "react";

export function useInteractionExecution<T extends InteractionBase, TProps>(interaction: T, data: TProps) {

    useMemo(() => () => {
        const chunks = [];
        interaction.execute({ data }, (result: ExecutionRun) => {
        }, (chunk: string) => {
            chunks.push(chunk);
        });
    }, []);

}
