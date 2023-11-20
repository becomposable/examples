import { useRef, useState } from 'react';
import { GenerateAStory } from '@composableai-examples/interactions/lib/language-tutor/GenerateAStory';
import { useInteractionStreaming } from '@composableai/react';
import { ExecutionRun } from '@composableai/sdk';

const API_KEY = import.meta.env.VITE_COMPOSABLE_PROMPT_API_KEY;
if (!API_KEY) {
    throw new Error('VITE_COMPOSABLE_PROMPT_API_KEY is not defined');
}


const generateStory = new GenerateAStory({
    apikey: API_KEY,
});

const initialValue = `{
    "student_name": "Julien",
    "student_age": 12,
    "interests": ["piano", "anime", "video games"],
    "study_language": "French",
    "user_language": "English",
    "type": "morning story",
    "topic": "",
    "level": "intermediate",
    "length": 300,
    "style": "Alexandre Dumas"
}
`

function App() {
    const dataRef = useRef<HTMLTextAreaElement>(null);
    const { text, execute, isRunning } = useInteractionStreaming(generateStory);
    const [run, setRun] = useState<ExecutionRun>();

    const onClick = () => {
        const content = dataRef.current ? dataRef.current.value : '';
        if (content == null) {
            alert('No data');
            return;
        }
        let json
        try {
            json = JSON.parse(content);
        } catch (e) {
            alert('Invalid JSON: ' + e);
            return;
        }
        execute({ data: json }).then(setRun)
    }

    return (
        <div>
            <h1>Generate a Story - Composable Prompts + React</h1>

            <div style={{ marginTop: '10px', flex: 'flex: 1', flexDirection: 'row' }}>
                <div style={{ flexDirection: 'column' }}>
                    <h2>
                        Input Data (<code>StoryGeneratorProps</code>)
                    </h2>
                    <textarea
                        style={{ width: '100%', height: '200px' }}
                        defaultValue={initialValue}
                        ref={dataRef}
                    />
                    <button onClick={onClick} disabled={isRunning}>
                        {isRunning ? 'Generating...' : 'Generate story'}
                    </button>
                </div>
                <div style={{ flexDirection: 'column' }}>
                    <h2>Story</h2>
                    <div
                        style={{
                            marginTop: '10px',
                            whiteSpace: 'pre-wrap',
                            border: '1px gray solid',
                            padding: '4px',
                        }}
                    >
                        {isRunning ? (
                            <span className={'chunks'}>{text || ''}</span>
                        ) : (
                            <span>{run?.result}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
