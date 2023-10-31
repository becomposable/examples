import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { StudyLanguageChat, configure } from "./interactions"
import { ChatPromptSchema, ExecutionRun } from "@composableai/studio";

configure({
  apikey: "sk-ec54686e78643101d7133b95ea2c43c5"
})

const studyLaguage = new StudyLanguageChat();

export default function App() {
  const [text, setText] = useState<string | undefined>(undefined);
  const [chat, setChat] = useState<ChatPromptSchema[]>([]);
  const [run, setRun] = useState<ExecutionRun>();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const executeInteraction = useMemo(() => () => {
    if (!message) return;
    setRun(undefined);
    const chunks: string[] = [];
    studyLaguage.execute({
      data: {
        student_name: "Julien",
        user_language: "french",
        study_language: "english",
        interests: ["sports", "music"],
        student_age: 20,
        chat
      }
    },
      () => {

      },
      (chunk: string) => {
        chunks.push(chunk);
        setText(chunks.join(""));
      });
  }, [message, run]);

  const onTypeMessage = (ev: ChangeEvent<HTMLInputElement>) => {
    setMessage(ev.target.value);
  }

  return (
    <div>
      <div>
        {
          chat.map((msg: ChatPromptSchema, index: number) =>
            <ChatMessage key={index} message={msg} />)
        }
      </div>
      <div>
        <input type='text' value={message} onChange={onTypeMessage} />

      </div>
    </div>
  )
}


function ChatMessage({ message }: { message: ChatPromptSchema }) {
  return (
    <div style={{
      borderBottom: '1px solid #dedede',
      margin: '8px 0',
      padding: '4px 0'
    }}>
      <h3>{message.role}</h3>
      <div>{message.content}</div>
    </div>
  )
}
