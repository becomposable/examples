# LLM-Powered Documentation Proofreading

This example demonstrates how to use an Interaction to proofread documentation, utilizing [Composable Prompts's Studio](https://composableprompts.com/features).

The Interaction, named "Proofread Documentation", accepts a document as input and outputs the updated document. Although it uses GPT-4 by default, it can also run on Llama2 and Mistral with ease.

As shown, executing this task with an LLM and integrating it into your client code requires less than 10 lines of code!

For more information on [how to use Interactions in Typescript / Javascript](https://docs.composableprompts.com/execute), refer to the documentation.

Feel free to clone and use this code as a base.

We aim to transform it into a generic Github Action for seamless integration into workflows.

## How to use

-   Create an Interaction `Proofread Documentation` in your [Composable Prompts's project](https://docs.composableprompts.com/quickstart)

    -   The input schema should include one field: `content`

    -   The output schema should consist of two fields: `updated_content` and `changes_summary`

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
Token used: 1665
Summary of Changes:  Clarified some sentences for better understanding, corrected some grammatical errors, and improved the overall flow of the document.
Saving updated file:  ./yourfile.updated.mdx
```

-   You can then also view the runs in your [Composable Prompts's Studio Run Console](https://app.composableprompts.com/runs)

This example illustrates how to employ an LLM in your code, eliminating the need for complex integration tasks, while keeping prompts and application separate. Plus, it's quite handy for writing docs!