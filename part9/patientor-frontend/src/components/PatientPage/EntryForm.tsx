import { useState } from 'react';
import { TextField, InputLabel, MenuItem, Select, Grid, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { HealthCheckRating, EntryWithoutId, Entry } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';

type AddEntryProps = {
	onCancel: React.Dispatch<React.SetStateAction<string>>;
	patientID: string
	setError: React.Dispatch<React.SetStateAction<string>>;
	onEntryAdded: (entry: Entry) => void;
};

const AddHospitalEntry = ({ onCancel, patientID, setError, onEntryAdded }: AddEntryProps) => {
	const [description, setDesription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await addEntry("Hospital", patientID, {
			description,
			date,
			specialist,
			dischargeDate,
			dischargeCriteria,
			diagnosisCodes,
		}, setError, onEntryAdded, onCancel);
	};

	return (
		<div>
			<h3>New hospital entry</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Description"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={description}
					onChange={({ target }) => setDesription(target.value)}
				/>
				<TextField
					label="Date"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<TextField
					label="Discharge date"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={dischargeDate}
					onChange={({ target }) => setDischargeDate(target.value)}
				/>
				<TextField
					label="Discharge criteria"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={dischargeCriteria}
					onChange={({ target }) => setDischargeCriteria(target.value)}
				/>
				<TextField
					label="Dianosis Codes"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>
				<Grid style={{ marginTop: '1rem' }}>
					<Grid item>
						<Button
							color="error"
							variant="contained"
							style={{ float: "left", marginBottom: '1rem' }}
							type="button"
							onClick={() => onCancel('')}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{ float: "right", marginBottom: '1rem' }}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>

	);
};

const AddOccupationalHealthcareEntry = ({ onCancel, patientID, setError, onEntryAdded }: AddEntryProps) => {
	const [description, setDesription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await addEntry("AddOccupationalHealthcare", patientID, {
			description,
			date,
			specialist,
			employerName,
			sickLeaveStart,
			sickLeaveEnd,
			diagnosisCodes,
		}, setError, onEntryAdded, onCancel);
	};

	return (
		<div>
			<h3>New occupational healthcare entry</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Description"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={description}
					onChange={({ target }) => setDesription(target.value)}
				/>
				<TextField
					label="Date"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<TextField
					label="Employer"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={employerName}
					onChange={({ target }) => setEmployerName(target.value)}
				/>
				<TextField
					label="Start of healthcare"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={sickLeaveStart}
					onChange={({ target }) => setSickLeaveStart(target.value)}
				/>
				<TextField
					label="End of healthcare"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={sickLeaveEnd}
					onChange={({ target }) => setSickLeaveEnd(target.value)}
				/>
				<TextField
					label="Dianosis Codes"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>
				<Grid style={{ marginTop: '1rem' }}>
					<Grid item>
						<Button
							color="error"
							variant="contained"
							style={{ float: "left", marginBottom: '1rem' }}
							type="button"
							onClick={() => onCancel('')}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{ float: "right", marginBottom: '1rem' }}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

interface HealthCheckRatingOption {
	value: HealthCheckRating;
	label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
	.filter((v): v is HealthCheckRating => typeof v === 'number')
	.map(v => ({
		value: v,
		label: HealthCheckRating[v]
	}));

const AddHealthCheckEntry = ({ onCancel, patientID, setError, onEntryAdded }: AddEntryProps) => {
	const [description, setDesription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | ''>('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');

	const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		const value = Number(event.target.value);
		if (!isNaN(value) && Object.values(HealthCheckRating).includes(value)) {
			setHealthCheckRating(value as HealthCheckRating);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await addEntry("HealthCheck", patientID, {
			description,
			date,
			specialist,
			healthCheckRating,
			diagnosisCodes,
		}, setError, onEntryAdded, onCancel);
	};

	return (
		<div>
			<h3>New health check entry</h3>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Description"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={description}
					onChange={({ target }) => setDesription(target.value)}
				/>
				<TextField
					label="Date"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Healthcheck Rating</InputLabel>
				<Select
					label="Healthcheck Rating"
					fullWidth
					style={{ marginBottom: '1rem' }}
					value={healthCheckRating.toString()}
					onChange={onHealthCheckRatingChange}
				>
					{healthCheckRatingOptions.map(option =>
						<MenuItem
							key={option.label}
							value={option.value}
						>
							{option.label}
						</MenuItem>
					)}
				</Select>
				<TextField
					label="Diagnosis Codes"
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>
				<Grid style={{ marginTop: '1rem' }}>
					<Grid item>
						<Button
							color="error"
							variant="contained"
							style={{ float: "left", marginBottom: '1rem' }}
							type="button"
							onClick={() => onCancel('')}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{ float: "right", marginBottom: '1rem' }}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

type EntryData = {
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: string;
	dischargeDate?: string;
	dischargeCriteria?: string;
	employerName?: string;
	sickLeaveStart?: string;
	sickLeaveEnd?: string;
	healthCheckRating?: HealthCheckRating | '';
};

const addEntry = async (
	type: string,
	patientID: string,
	data: EntryData,
	setError: React.Dispatch<React.SetStateAction<string>>,
	onEntryAdded: (entry: Entry) => void,
	onCancel: React.Dispatch<React.SetStateAction<string>>
) => {
	const diagnosisCodes = data.diagnosisCodes
		? data.diagnosisCodes.split(',')
		: [];

	try {
		let newEntry: Entry;

		if (type === "Hospital") {
			const entry: EntryWithoutId = {
				type: "Hospital",
				description: data.description,
				date: data.date,
				specialist: data.specialist,
				diagnosisCodes,
				discharge: {
					date: data.dischargeDate || '',
					criteria: data.dischargeCriteria || ''
				}
			};
			newEntry = await patientService.createEntry(patientID, entry);
			onEntryAdded(newEntry);
			onCancel('');
		} else if (type === "OccupationalHealthcare") {
			const entry: EntryWithoutId = {
				type: "OccupationalHealthcare",
				description: data.description,
				date: data.date,
				specialist: data.specialist,
				diagnosisCodes,
				employerName: data.employerName || '',
				sickLeave: data.sickLeaveStart && data.sickLeaveEnd ? {
					startDate: data.sickLeaveStart,
					endDate: data.sickLeaveEnd
				} : undefined
			};
			newEntry = await patientService.createEntry(patientID, entry);
			onEntryAdded(newEntry);
			onCancel('');
		} else if (type === "HealthCheck") {
			const entry: EntryWithoutId = {
				type: "HealthCheck",
				description: data.description,
				date: data.date,
				specialist: data.specialist,
				diagnosisCodes,
				healthCheckRating: Number(data.healthCheckRating)
			};
			newEntry = await patientService.createEntry(patientID, entry);
			onEntryAdded(newEntry);
			onCancel('');
		}
	} catch (error: unknown) {
		const errorMessage = axios.isAxiosError(error)
			? (error.response?.data?.error || error.message)
			: (error instanceof Error ? error.message : 'Unknown error');

		setError(Array.isArray(errorMessage) ? errorMessage.map(e => e.message || e).join(', ') : errorMessage);
	}
};


type EntryFormProps = {
	type: string;
	onCancel: React.Dispatch<React.SetStateAction<string>>;
	patientID: string;
	setError: React.Dispatch<React.SetStateAction<string>>
	onEntryAdded: (entry: Entry) => void;
};

const EntryForm = ({ type, onCancel, patientID, setError, onEntryAdded }: EntryFormProps) => {
	switch (type) {
		case "Hospital":
			return <AddHospitalEntry onCancel={onCancel} patientID={patientID} setError={setError} onEntryAdded={onEntryAdded} />;
		case "OccupationalHealthcare":
			return <AddOccupationalHealthcareEntry onCancel={onCancel} patientID={patientID} setError={setError} onEntryAdded={onEntryAdded} />;
		case "HealthCheck":
			return <AddHealthCheckEntry onCancel={onCancel} patientID={patientID} setError={setError} onEntryAdded={onEntryAdded} />;
		default:
			throw new Error(`EntryForm: Invalid entry type "${type}". Expected one of: Hospital, OccupationalHealthcare, HealthCheck`);
	}
};

export default EntryForm;