import { ExecutionRun, InteractionBase, InteractionExecutionPayload } from "@composableai/studio";
import { useMemo, useState } from "react";


export function useInteraction<TProps, TReturn>(interaction: InteractionBase<TProps, TReturn>) {

    const [isRunning, setRunning] = useState(false);
    const [text, setText] = useState('');
    const [run, setRun] = useState<ExecutionRun<TProps, TReturn>>();

    const execute = useMemo(() => (payload?: InteractionExecutionPayload<TProps>): Promise<ExecutionRun<TProps, TReturn>> => {
        if (isRunning) {
            return Promise.reject(new Error('Trying to run the interaction while it is already running.'));
        }
        setRun(undefined);
        setRunning(true);
        return new Promise((resolve, reject) => {
            let chunks: string[] = [];
            interaction.execute(payload, (result: ExecutionRun) => {
                chunks = [];
                setRun(result);
                setText('');
                setRunning(false);
                resolve(result);
            }, (chunk: string) => {
                chunks.push(chunk);
                setText(chunks.join(''));
            }).catch(reject);
        })
    }, [run]);

    return { text, run, isRunning, execute }
}
