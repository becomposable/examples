# LLM-Powered Documentation Proofreading

This example shows how to use an Interaction to proofread documentation,
using [Composable Prompts's Studio](https://composableprompts.com/features).

It uses an Interaction "Proofread Documentation" that takes a document as input and ouput
the updated document. By default it uses GPT-4 but it can also run on Llama2 and Mistral easily.

As you can see, it takes less than 10 lines of code to have this task executed by a LLM and integrated into your client code!

You can learn more on [how to use Interactions in Typescript / Javascript](https://docs.composableprompts.com/execute) on in the documentation.

You can clone and use this code as a base.

We plan to adapt it and make it into a generic Github Action for easy use as part of workflows.

## How to use

-   Create an Interaction `Proofread Documentation` in your [Composable Prompts's project](https://docs.composableprompts.com/quickstart)

    -   Input schema should have one field `content`

    -   Output schema should have two fields: `updated_content` and `changes_summary`

-   Clone this repository / folder and install [cpcli](https://docs.composableprompts.com/cpcli)

-   Synchronize your interaction:

```shell
$ cpcli -p <projectId> -k <apikey> export interactions.ts
```

-   Execute the proofreading of a file:

```shell
$ ts-node --esm index.ts <your_file.mdx>

Token Count:  715
Response:
Received response in 60797ms
Length of updated doc: 3164
Token used {
  "prompt": 853,
  "result": 812,
  "total": 1665
}
Summary of Changes:  Clarified some sentences for better understanding, corrected some grammatical errors, and improved the overall flow of the document.
Saving updated file:  ./yourfile.updated.mdx
```

-   You can then also see the runs in your [Composable Prompts's Studio Run Console](https://app.composableprompts.com/runs)

This is an example of how to leverage an LLM in your code, without having to do the heavy lifting of the integration, and keeping prompts and application separated. Also, it's pretty handy when writing docs!
