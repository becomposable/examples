import { ChatPromptSchema, PromptRole } from '@composableai/studio';
import { ChangeEvent, useState } from 'react';
import { StudyLanguageChat, configure } from './interactions';
import { useInteractionStreaming } from '@composableai/react';

const API_KEY = import.meta.env.VITE_COMPOSABLE_PROMPT_API_KEY;
if (!API_KEY) {
    throw new Error('VITE_COMPOSABLE_PROMPT_API_KEY is not defined');
}

configure({
    apikey: API_KEY,
});

const studyLaguage = new StudyLanguageChat();

const params = {
    student_name: 'Julien',
    user_language: 'french',
    study_language: 'english',
    interests: ['sports', 'music'],
    student_age: 20,
};

export default function App() {
    const [chat, setChat] = useState<ChatPromptSchema[]>([]);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const { isRunning, text, execute } = useInteractionStreaming(studyLaguage);

    const onTypeMessage = (ev: ChangeEvent<HTMLInputElement>) => {
        setMessage(ev.target.value);
    };

    const onSend = () => {
        if (!message) return;
        const newChat = [
            ...chat,
            {
                role: PromptRole.user,
                content: message,
            } as ChatPromptSchema,
        ];
        setChat(newChat);
        setMessage('');
        execute({
            data: {
                ...params,
                chat: newChat,
            },
        }).then((run) => {
            setChat([
                ...newChat,
                { role: PromptRole.assistant, content: run.result } as ChatPromptSchema,
            ]);
        }).catch((err) => {
            console.error('Failed to execute', err);
        });
    };

    return (
        <main>
            <h1>Composable Prompt Example: Chat + React</h1>
            <div>
                This example show how to use a directed Chat with a model using Composable Prompts.
                Prompts are used for safety and guidance. By default, the model is told that is it a
                language learning assistant, the user is speaking french and is leanring english.
                You can change these input parameters in the code.
            </div>
            <div>
                <h3>Interactive Guided Chat</h3>
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
                    <input
                        type="text"
                        value={message || ''}
                        onChange={onTypeMessage}
                        placeholder="Type something"
                    />
                    <button onClick={onSend} disabled={isRunning}>
                        {isRunning ? 'Processing ...' : 'Send'}
                    </button>
                </div>
            </div>
        </main>
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
