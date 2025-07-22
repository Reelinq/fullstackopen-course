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
						type='date'
						value={newDate}
						onChange={(event) => setNewDate(event.target.value)}
					/>
				</div>
				<div>
					<fieldset>
						<legend>weather</legend>
						<label htmlFor="weatherChoice1">sunny</label> <input type="radio" name="weather" id="weatherChoice1" value="sunny" onChange={(event) => setNewWeather(event.target.value)} />
						<label htmlFor="weatherChoice2">rainy</label> <input type="radio" name="weather" id="weatherChoice2" value="rainy" onChange={(event) => setNewWeather(event.target.value)} />
						<label htmlFor="weatherChoice3">cloudy</label> <input type="radio" name="weather" id="weatherChoice3" value="cloudy" onChange={(event) => setNewWeather(event.target.value)} />
						<label htmlFor="weatherChoice4">stormy</label> <input type="radio" name="weather" id="weatherChoice4" value="stormy" onChange={(event) => setNewWeather(event.target.value)} />
						<label htmlFor="weatherChoice5">windy</label> <input type="radio" name="weather" id="weatherChoice5" value="windy" onChange={(event) => setNewWeather(event.target.value)} />
					</fieldset>
				</div>
				<div>
					<fieldset>
						<legend>visibility</legend>
						<label htmlFor="visibilityChoice1">great</label> <input type="radio" name="visibility" id="visibilityChoice1" value="great" onChange={(event) => setNewVisibility(event.target.value)} />
						<label htmlFor="visibilityChoice2">good</label> <input type="radio" name="visibility" id="visibilityChoice2" value="good" onChange={(event) => setNewVisibility(event.target.value)} />
						<label htmlFor="visibilityChoice3">ok</label> <input type="radio" name="visibility" id="visibilityChoice3" value="ok" onChange={(event) => setNewVisibility(event.target.value)} />
						<label htmlFor="visibilityChoice4">poor</label> <input type="radio" name="visibility" id="visibilityChoice4" value="poor" onChange={(event) => setNewVisibility(event.target.value)} />
					</fieldset>
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