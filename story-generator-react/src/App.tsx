import { useCallback, useState } from "react";
import { GenerateAStory, configure } from "./interaction"
import { ExecutionRun } from "@composableai/studio";

configure({
	apikey: "sk-ec54686e78643101d7133b95ea2c43c5"
})

function App() {
	const [run, setRun] = useState<ExecutionRun>();
	const [content, setContent] = useState<string>();

	const onClick = useCallback(() => {
		const chunks: string[] = [];
		new GenerateAStory().execute({
			data: {
				"student_name": "Julien",
				"student_age": 12,
				"interests": [
					"piano",
					"anime",
					"video games"
				],
				"study_language": "French",
				"user_language": "English",
				"type": "morning story",
				"topic": "",
				"level": "intermediate",
				"length": 300,
				"style": "Alexandre Dumas"
			}
		}, (run) => {
			setRun(run);
		}, (chunk: string) => {
			chunks.push(chunk);
			setContent(chunks.join(''));
		})
	}, []);

	return (
		<div>
			<button onClick={onClick}>Generate story</button>
			<div style={{ marginTop: '10px', whiteSpace: "pre-wrap" }}>
				{
					run ? run.result : <span className={content == null ? '' : 'chunks'}>{content || ''}</span>
				}
			</div>
		</div>
	)
}

export default App
