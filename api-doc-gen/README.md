# Memory pack examples.

This project contains several memory packs examples:

1. haiku
2. release-notes.ts
3. composable-api-doc.ts
4. nable-api-doc.ts


## Memory pack mapping

To explain the memory pack mapping we will use the `haiku` memory pack since it is simple and best suited to explain the memory pack mapping concepts.

Let's inspect the content of the haiku recipe:

```ts
copyText("space", "topic.txt")

export default {
    topic: "life",
    mood: "happy",
    language: "english",
}
```

The first line creates a file `topic.txt` which content is the word "space".
And then exports a metadata (which will be saved in the pack as the `metadata.json` file) by setting 3 properties: `topic`, `mood` and `language`.

The Generate Haiku can use this memory pack as its input data. The interaction takes 3 input properties: `topic`, `mood` and `language`.

Let's publish first the haiku memory pack to the project containing the "Generate Haiku" interaction. We will do this using the `composable` cli application. We assume you already created a staging (or local) profile. Let's run:

```
❯ composable memo build ./recipes/haiku.ts -o "memory:haiku"
Memory saved to store_dev_05948c_631dc3/memories/haiku.tar.gz
```

Now let's run the GenerateHaiku interaction using the memory pack.

```
❯ composable run GenerateHaiku -d "memory:haiku"

Vibrant petals bloom
Embracing each moment's gift
Life's joyous canvas
```

This is the simplest way of running an interaction against of a memory pack. If you don't specify a mapping on how to map the memory pack content to the interaction properties then, a one to one mapping between the memory pack metadata and the interaction property is done.
That means the topic, mood and language properties from the memory pack will be directly injected into the interaction parameters.

In our case the injected properties are "life", "happy" and "english".

You can specify a custom memory pack mapping using a JSON object which maps properties form the interaction to expressions that resolve to some content inside the memory pack.
There is a special mapping `{"@":"@"}` which means map all the properties from the metadata of the memory pack as the interaction parameters.
This is similar to the default one to one mapping. So instead of running

```
composable run GenerateHaiku -d "memory:haiku"
```

we could run

```
composable run GenerateHaiku -d "memory:haiku" --mmap '{"@":"@"}'
```

which will have the same effect.

Let's now use the content of the file `topic.txt` as the source of the interaction topic parameters.
To achieve this we can use the `"topic": "@content:topic.txt"`

```
❯ composable run GenerateHaiku -d "memory:haiku" --mmap '{"@":"@", "topic": "@content:topic.txt"}'

Boundless cosmic dance,
Twinkling stars guide our journey,
Laughter echoes far.
```

We still specify `"@":"@"` because we want to first map all the metadata properties then to override the topic with the content from the topic.txt file.

There are 4 types of mapping:

### **{"interaction_param": "@metadata_prop"}**
You can use this to explicitly map an interaction parameter to a metadata property. You can use nested metadata properties expressions like: `@parent.child.prop`

So we can now rewrite the previous mapping as this:

```
❯ composable run GenerateHaiku -d "memory:haiku" --mmap '{"mood": "@mood", "language": "@language", "topic": "@content:topic.txt"}'

Vast cosmos beckons,
Stardust dances in the night,
Infinite delight.
```

the result will be the same.

### **{"interaction_param": "@content:some/file.ext"}

This will map the content of the `some/file.ext` file into the `interaction_param`

### **{"interaction_param": "@file:some/file.ext"}

This will map an object with the shape `{name:string,content:string}` as the value of the `interaction_param`.
The `name` property is the file name (in the memory pack) and the `content` property is the content of that file.

This is usefull when one needs to use the content and the file name to create the LLM prompt.

### **{"interaction_param": someJSONValue}

This mapping can be used to map random values as to interaction params.
It can be any JSON value (object, array, string, number, boolean etc.). If a string it should not begin with `@` in order to not be treated as an expression.

We can for example use a different language for our last interaction execution:

```
❯ composable run GenerateHaiku -d "memory:haiku" --mmap '{"mood": "@mood", "language": "french", "topic": "@content:topic.txt"}'

Étoiles scintillantes
Dansent dans l'immensité
L'univers sourit
```

## Examples

The haiku recipe was made specifically to explain how the mapping works but it is not a very useful recipe.

We provide 3 others recipes that can be used in real world scenarios:

### release-notes.ts

This recipe is fetching the issues used to commit bewteen two revisions and the is creating a diff with the changes.
This memory pack can the be used to ask a LLM to generate highlights based on the issue descriptions and the code diff.

This memory pack works with the ReleaseNotHiglights interaction. To run it using the memory pack as the input use the command:

```
❯ composable run ReleaseNoteHighlights -S -d "memory:release-notes" --mmap '{"@":"@", "issues" : "@content:issues/*", "code_diff": "@content:range_diff.txt"}'
```

### composable-api-doc.ts

This recipe is collecting composable sources and documentation to expose these to the Generate Api Doc interaction.

To build the memory pack:

```
memo build recipes/composable-api-doc.ts --var-studio ~/work/studio -o composable-api.tar
```

To build and publish to the project bucket:

```
❯ composable memo build recipes/composable-api-doc.ts --var-studio ~/work/studio -o "memory:composable-api-doc/input"
```

Change the path to studio root with the one on your device.

To run the memory pack as the input of the `GenerateAPIDoc2` interaction you should use the following mapping:

```
{
  "api_endpoints": "@file:api/**/*.ts",
  "api_client": "@file:client/**/*.ts",
  "types": "@file:types/**/*.ts",
  "examples": "@file:examples/*.mdx",
}
```

The `GenerateAPIDoc2` should not be run directly. It is controlled by a workflow named `iterativeGenerationWorkflow`.

In order to run it you should start the workflow with the following configuration vars:

```ts
interface IterativeGenerationPayload {
    // the main interaction to execute. If iterative_generation is defined
    // the main interaction will only be used to prepare the iteration (to generate the TOC)
    // otherwise it will be used for the iterative generation too.
    interaction: string;
    // if defined this will be used for the iterative interaction which will genrate parts.
    // otherwise the main interaction will be used for iterative generation.
    iterative_interaction?: string;
    // the environment to use
    environment?: string;
    // the model to use
    model?: string;
    // A custom max tokens
    max_tokens?: number;
    // A custom temperature
    temperature?: number;
    // the memory pack group name
    memory: string;
    // the input memory pack mapping
    input_mapping?: Record<string, string>;
    // custom toc schema if any
    toc_schema?: Record<string, any>
}
```

Here is a possible payload for the workflow:

```
{
    vars: {
        interaction: 'GenerateAPIDoc2',
        environment: '65c2ffbd07d5a487fb8f35b7',
        model: 'gemini-1.5-pro',
        max_tokens: 8000,
        memory: 'composable-api-doc/input',
        input_mapping: {
            "api_endpoints": "@file:api/**/*.ts",
            "api_client": "@file:client/**/*.ts",
            "types": "@file:types/**/*.ts",
            "examples": "@file:examples/*.mdx",
        }
    }
}
```

To start the workflow using the composable client run:

```
composable workflows execute iterativeGenerationWorkflow -f payload.json
```

where the payload.json cotnains the payload above.

### nable-api-doc.ts

This recipe is collecting "nable" sources from its github repository

To build the memory pack:

```
memo build recipes/nable-api-doc.ts --var-repo https://github.com/mostafa-n-able/N-central-REST/ -o nable.tar
```
