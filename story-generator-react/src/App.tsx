import { ExecutionRun } from '@composableai/studio';
import { useCallback, useRef, useState } from 'react';
import { GenerateAStory, GenerateAStoryProps, configure } from './interaction';

configure({
    apikey: 'sk-ec54686e78643101d7133b95ea2c43c5',
});

function App() {
    const [run, setRun] = useState<ExecutionRun>();
    const [content, setContent] = useState<string>();
    const [data, setData] = useState<GenerateAStoryProps>({
        student_name: 'Julien',
        student_age: 12,
        interests: ['piano', 'anime', 'video games'],
        study_language: 'French',
        user_language: 'English',
        type: 'morning story',
        topic: '',
        level: 'intermediate',
        length: 300,
        style: 'Alexandre Dumas',
    });
    const dataRef = useRef<HTMLTextAreaElement>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const onClick = useCallback(() => {
        const content = dataRef.current ? dataRef.current.value : '';
        if (content == null) {
            alert('No data');
            return;
        }
        try {
            const json = JSON.parse(content);
            setData(json);
        } catch (e) {
            alert('Invalid JSON: ' + e);
            return;
        }

        setIsGenerating(true);
        const chunks: string[] = [];
        new GenerateAStory()
            .execute(
                { data: data },
                (run) => {
                    setRun(run);
                },
                (chunk: string) => {
                    chunks.push(chunk);
                    setContent(chunks.join(''));
                }
            )
            .finally(() => {
                setIsGenerating(false);
            });
    }, []);

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
                        defaultValue={JSON.stringify(data, null, 2)}
                        ref={dataRef}
                    />
                    <button onClick={onClick} disabled={isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate story'}
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
                        {run ? (
                            run.result
                        ) : (
                            <span className={content == null ? '' : 'chunks'}>{content || ''}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;