import { ChatPromptSchema, ExecutionRun, PromptRole } from '@composableai/studio';
import { ChangeEvent, useMemo, useState } from 'react';
import { StudyLanguageChat, configure } from './interactions';

const API_KEY = import.meta.env.VITE_COMPOSABLE_PROMPT_API_KEY;
if (!API_KEY) {
    throw new Error('VITE_COMPOSABLE_PROMPT_API_KEY is not defined');
}

configure({
    apikey: API_KEY,
});

const studyLaguage = new StudyLanguageChat();

export default function App() {
    const [text, setText] = useState<string | undefined>(undefined);
    const [chat, setChat] = useState<ChatPromptSchema[]>([]);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const params = {
        student_name: 'Julien',
        user_language: 'french',
        study_language: 'english',
        interests: ['sports', 'music'],
        student_age: 20,
    };

    const executeInteraction = useMemo(
        () => () => {
            if (!message) {
                alert('no message typed');
                return;
            }

            setMessage('');
            setText('');
            const chunks: string[] = [];
            studyLaguage.execute(
                {
                    data: {
                        ...params,
                        //add message to the chat data sent to the model
                        chat: [...chat, { role: PromptRole.user, content: message }],
                    },
                },
                //this is what is called when model response is complete
                (run: ExecutionRun) => {
                    //save message pair when response is received
                    setChat([
                        ...chat,
                        { role: PromptRole.user, content: message },
                        { role: PromptRole.assistant, content: run.result as string },
                    ]);
                    setText(undefined);
                },
                //this is what is called when streaming chunks are received
                (chunk: string) => {
                    chunks.push(chunk);
                    setText(chunks.join(''));
                }
            );
        },
        [message, chat]
    );

    const onTypeMessage = (ev: ChangeEvent<HTMLInputElement>) => {
        setMessage(ev.target.value);
    };

    return (
        <div>
            <div>
                {chat.map((msg: ChatPromptSchema, index: number) => (
                    <ChatMessage key={index} message={msg} />
                ))}
            </div>
            <div>
                {text && (
                    <div className="chunks" style={{ whiteSpace: 'pre-wrap' }}>
                        {text}
                    </div>
                )}
            </div>
            <div style={{ marginTop: '16px' }}>
                <input type="text" value={message || ''} onChange={onTypeMessage} />
                <button onClick={executeInteraction}>Send</button>
            </div>
        </div>
    );
}

function ChatMessage({ message }: { message: ChatPromptSchema }) {
    return (
        <div
            style={{
                whiteSpace: 'pre-wrap',
                borderBottom: '1px solid #dedede',
                margin: '8px 0',
                padding: '16px 0',
            }}
        >
            <h3>{message.role}</h3>
            <div>{message.content}</div>
        </div>
    );
}
