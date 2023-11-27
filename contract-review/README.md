# LLM-powered Contract / Document Review Example

Here is an example showing how to use Composable Prompts to create document review tasks and
use them in an application. This can be easily adapted and used in Salesforce, Netsuite, SAP, etc.

It's a simple example, of a single page app (that could be easily embeded in any web app), 
that launch a review task, and display the result. The code for processing the content is less than 5 line of code, so it's easy to adapt to any use case:

```javascript
const runReview = async () => {
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
```

