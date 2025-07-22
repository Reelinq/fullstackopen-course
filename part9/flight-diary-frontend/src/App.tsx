import { useState, useEffect } from 'react';
import type { DiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from './services/entryService';

const App = () => {
	const [newDate, setNewDate] = useState('');
	const [newWeather, setNewWeather] = useState('');
	const [newVisibility, setNewVisibility] = useState('');
	const [newComment, setNewComment] = useState('');
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		getAllDiaryEntries().then(data => {
			setDiaryEntries(data)
		})
	}, [])

	const diaryEntryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault()
		try {
			createDiaryEntry({
				date: newDate,
				weather: newWeather as Weather,
				visibility: newVisibility as Visibility,
				comment: newComment
			}).then(data => {
				setDiaryEntries(diaryEntries.concat(data))
			})

			setNewDate('')
			setNewWeather('')
			setNewVisibility('')
			setNewComment('')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Unknown error');
		}
	};

	return (
		<div>
			<h2>Add new entry</h2>
			{error && (
				<div style={{ color: 'red' }}>
					<p>{error}</p>
				</div>
			)}
			<form onSubmit={diaryEntryCreation}>
				<div>
					date
					<input
						value={newDate}
						onChange={(event) => setNewDate(event.target.value)}
					/>
				</div>
				<div>
					weather
					<input
						value={newWeather}
						onChange={(event) => setNewWeather(event.target.value)}
					/>
				</div>
				<div>
					visibility
					<input
						value={newVisibility}
						onChange={(event) => setNewVisibility(event.target.value)}
					/>
				</div>
				<div>
					comment
					<input
						value={newComment}
						onChange={(event) => setNewComment(event.target.value)}
					/>
				</div>
				<button type='submit'>add</button>
			</form>
			<h2>Diary entries</h2>
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