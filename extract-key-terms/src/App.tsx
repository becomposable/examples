import { useRef, useState } from 'react';
import { ExtractKeyTerms, ExtractKeyTermsResult } from '@composableai-examples/interactions/lib/ExtractKeyTerms';
import { ExecutionRun } from '@composableai/sdk';

const API_KEY = import.meta.env.VITE_COMPOSABLE_PROMPT_API_KEY;
if (!API_KEY) {
    throw new Error('VITE_COMPOSABLE_PROMPT_API_KEY is not defined');
}


const extractor = new ExtractKeyTerms({
    apikey: API_KEY,
    //    serverUrl: 'http://localhost:8091',
});

function App() {
    const dataRef = useRef<HTMLTextAreaElement>(null);
    const [result, setResult] = useState<ExtractKeyTermsResult|undefined>(undefined);
    const [run, setRun] = useState<ExecutionRun|undefined>(undefined);
    const [isRunning, setIsRunning] = useState(false);
    const [contract, setContract] = useState('');

    const onClick = () => {
        const content = dataRef.current ? dataRef.current.value : '';
        setContract(content);

        setIsRunning(true);
        extractor.execute({ 
            data: {contract: content} ,
            
        }).then((res) => {
            setResult(res.result);
            setRun(res);
        }).finally(() => {
            setIsRunning(false);
        });

    }

    return (
        <div>
            <h1>Extract Key Terms from Contract</h1>

            <div style={{ marginTop: '10px', flex: 'flex: 1', flexDirection: 'row' }}>
                <div style={{ flexDirection: 'column' }}>
                    <h2>
                        Input Data (<code></code>)
                    </h2>
                    <textarea
                        style={{ width: '100%', height: '200px' }}
                        defaultValue=""
                        ref={dataRef}
                    />
                    <button onClick={onClick} disabled={isRunning}>
                        {isRunning ? 'Reading...' : 'Extract Key Terms'}
                    </button>
                </div>
                <div style={{ flexDirection: 'column' }}>
                    <h2>Result</h2>
                    <div
                        style={{
                            marginTop: '10px',
                            whiteSpace: 'pre-wrap',
                            border: '1px gray solid',
                            padding: '4px',
                        }}
                    >
                        {isRunning ? (
                           <span>Reading...</span>
                        ) : (
                            result ? <TermsView result={result} contract={contract} /> : 'No result yet'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export function TermsView({result, contract}: { result: ExtractKeyTermsResult, contract: string }) {
    return (
        <div>
            <h2>Details</h2>
            <ol>
                Vendor: {result.vendor_name}
                Customer: {result.customer_name}
            </ol>
            <h2>Key Terms</h2>
            <KeyTerms result={result} contract={contract} />
        </div>
    );
}

export function KeyTerms({result, contract}: { result: ExtractKeyTermsResult, contract: string }) {

    const getClause = (start: number, end: number) => {
        return contract.substring(start, end);
    }

    return (
        <div>
            <ul>
                {result.key_terms.map((term, i) => (
                    <ol key={i}><div><b>Summary: {term.term_summary}</b></div>
                        <div className="color: gray">Full Clause: {getClause(term.start, term.end)}</div>
                    </ol>
                ))}
            </ul>
        </div>
    );
}

export default App;
