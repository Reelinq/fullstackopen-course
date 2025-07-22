import { useState, useEffect } from 'react';
import type { DiaryEntry } from "./types";
import { getAllEntries } from './services/entryService';

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllEntries().then(data => {
			setDiaryEntries(data)
		})
	}, [])

	return (
		<div>
			{diaryEntries.map(entry => (
				<div key={entry.id}>
					<h3>Date: {entry.date}</h3>
					<p>Weather: {entry.weather}</p>
					<p>Visibility: {entry.visibility}</p>
					<p>Comment: {entry.comment}</p>
				</div>
			))}
		</div>
	)
}
export default App