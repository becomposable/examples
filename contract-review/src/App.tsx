//import { configure } from '@composableai/sdk';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import DocumentPicker, { DocumentLink } from './DocumentPicker';
import { ReviewContract, ReviewContractResult, configure } from './interactions';

export const keys = {
    cpkey: import.meta.env.VITE_CP_KEY,
    clientId: import.meta.env.VITE_CLIENT_ID,
    devKey: import.meta.env.VITE_DEVELOPER_KEY,
};

configure({ apikey: keys.cpkey, });

interface Document {
    name: string;
    text: string;
    url: string;
}


function App () {

    const [policyDocument, setPolicyDocument] = useState<Document | null>(null);
    const [contractDocument, setContractDocument] = useState<Document | null>(null);
    const [contractDocumentLink, setContractDocumentLink] = useState<DocumentLink | null>(null);
    const [policyDocumentLink, setPolicyDocumentLink] = useState<DocumentLink | null>(null);
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);

    const [analysisResult, setAnalysisResult] = useState<ReviewContractResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isFetchingDocument, setIsFetchingDocument] = useState({
        policy: false,
        contract: false,
    });

    useEffect(() => {
        if (policyDocumentLink) {
            setIsFetchingDocument({ ...isFetchingDocument, policy: true });
            fetchDocument(policyDocumentLink, setPolicyDocument).finally(() => {
                setIsFetchingDocument({ ...isFetchingDocument, policy: false });
            });
        }
    }, [policyDocumentLink]);

    useEffect(() => {
        setIsFetchingDocument({ ...isFetchingDocument, contract: true });
        if (contractDocumentLink) {
            fetchDocument(contractDocumentLink, setContractDocument).finally(() => {
                setIsFetchingDocument({ ...isFetchingDocument, contract: false });
            });
        }
    }, [contractDocumentLink]);

    const fetchDocument = async (doc: DocumentLink, setContent: (doc: Document) => void) => {
        console.log("Fetching: ", doc.name);
        if (!authToken) {
            console.error("No auth token");
            return;
        }

        const url = `https://www.googleapis.com/drive/v3/files/${doc.docId}/export?mimeType=text/plain`;
        fetch(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }).then((response) => {
            return response.text();
        }).then((text) => {
            console.log(text);
            setContent({
                name: doc.name,
                text,
                url: doc.url,
            });
        }).catch((error) => {
            console.error(error);
            setError(error);
        });
    };

    const runAnalysis = async () => {
        if (!policyDocument || !contractDocument) return;
        console.log("Running analysis", policyDocument, contractDocument);
        setIsLoading(true);
        const reviewer = new ReviewContract();
        await reviewer.execute({
            data: {
                contract: contractDocument?.text,
                policy: policyDocument?.text,
                customer_name: "Big Corp",
                service_description: "consulting services",
            }
        })
            .then((result) => setAnalysisResult(result.result))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <main className=' text-slate-900 px-12 py-8 max-w-6xl'>
            <h1 className="text-3xl font-semibold pb-8">Document Review Example</h1>
            <p className="pb-8 prose" >
                This example shows how to use the
                {' '}<a href="https://composableprompts.com">Composable Prompts</a>{' '}
                to review a document (like a contract) against a policy. It works fully client side,
                calling an interaction in Composable Prompts to run the analysis after fetching the documents
                in Google Drive.
            </p>
            {error && <div className="text-red-500 py-4 border">{error}</div>}
            <div className='flex flex-row'>
                <div className='w-1/3 border border-slate-700 px-2 py-2 mr-4'>
                    <h2 className='text-2xl font-bold'>Documents</h2>
                    <div className="">
                        <h3 className='text-lg font-semibold py-2'>
                            Policy
                        </h3>
                        {policyDocumentLink ?
                            <div>
                                Document: <a href={policyDocumentLink.url}>{policyDocumentLink.name}</a>
                                <br />
                                Status: {' '}
                                {isFetchingDocument.policy && <span className='animate-pulse'>Fetching...</span>}
                                {policyDocument && <span className=' text-green-700'>Ready!</span>}
                            </div>
                            :
                            <div>
                                No policy selected
                            </div>
                        }
                        <DocumentPicker actionName="Select Policy"
                            onSelect={(data) => setPolicyDocumentLink(data)}
                            setAuthToken={setAuthToken} />
                    </div>

                    <div className="py-4">
                        <h3 className='text-lg font-semibold py-2'>Document to review</h3>
                        {contractDocumentLink ?
                            <div>
                                Agreement: <a href={contractDocumentLink.url}>{contractDocumentLink.name}</a>
                                <br />
                                <div className='flex flex-row'>
                                    Status: {' '}
                                    {isFetchingDocument.contract && <span className='animate-pulse'>Fetching...</span>}
                                    {contractDocument && <span className='text-green-700'>Ready!</span>}
                                </div>
                            </div>
                            :
                            <div>
                                No policy selected
                            </div>
                        }
                        <DocumentPicker actionName="Select Document"
                            onSelect={(data) => setContractDocumentLink(data)}
                            setAuthToken={setAuthToken} />
                    </div>
                    <div className="pt-8 border-top-2">
                        {contractDocument && policyDocument && !isLoading &&
                            <div className="text-green-700">
                                Ready to run analysis
                            </div>}
                        <button disabled={isLoading || !contractDocument || !policyDocument} className="bg-indigo-500 hover:bg-indigo-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={runAnalysis}>
                            Run Analysis
                        </button>
                    </div>
                </div>

                <hr />

                <div>
                    <div className='py-2 prose'>
                        <h2>Document Review</h2>
                        {isLoading && <div className="py-2 animate-pulse">Analysing...</div>}
                        {!analysisResult && !isLoading && <div className="py-2">Select document to run the review</div>}
                        {analysisResult &&
                            <div>
                                <div>
                                    Result: {analysisResult.is_compliant ? "Compliant" : "Not Compliant"}
                                </div>
                                <ol>
                                    {analysisResult.issues.map((issue, index) => {
                                        return (
                                            <li key={index} className='border rounded'>
                                                <p className={clsx(
                                                    'font-semibold',
                                                    issue.importance === "high" && "text-red-700",
                                                    issue.importance === "medium" && "text-yellow-700",
                                                    issue.importance === "low" && "text-gray-700",)}
                                                ><span className='font-semibold'>[{issue.importance}]</span> {issue.description}</p>
                                                <p>Suggested Remediation: {issue.suggested_remediation}</p>
                                            </li>
                                        );
                                    }
                                    )}
                                </ol>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </main>
    );

}

export default App;
