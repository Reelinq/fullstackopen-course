import { useState } from "react";
import { Patient, Diagnosis, Entry } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';
import { Button, Box } from '@mui/material';
import EntryForm from './EntryForm';
import Notification from '../Notification';

interface PatientPageProps {
	patient: Patient | undefined | null
	diagnoses: Diagnosis[]
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientPage = ({ patient, diagnoses, setPatients }: PatientPageProps) => {
	const [newEntryVariants, setNewEntryVariants] = useState(false);
	const [newEntryFormVisible, setNewEntryFormVisible] = useState('');
	const [error, setError] = useState('');

	if (!patient) return <div>Patient not found</div>;

	const handleEntryAdded = (newEntry: Entry) => {
		if (patient) {
			setPatients(prevPatients =>
				prevPatients.map(p =>
					p.id === patient.id
						? { ...p, entries: [...p.entries, newEntry] }
						: p
				)
			);
		}
	};


	return (
		<div>
			<h2>
				{patient.name}
				{patient.gender === 'male' ? (
					<MaleIcon />
				) : patient.gender === 'female' ? (
					<FemaleIcon />
				) : (
					<TransgenderIcon />
				)}
			</h2>
			{patient.ssn && <p>ssn: {patient.ssn}</p>}
			<p>occupation: {patient.occupation}</p>
			<h3>entries</h3>
			{patient.entries.map(entry => (
				<div key={entry.id} style={{ border: '2px solid black', borderRadius: '5px', marginBottom: '1rem' }}>
					<EntryDetails entry={entry} diagnoses={diagnoses} />
				</div>
			))}

			{!newEntryFormVisible && !newEntryVariants && (
				<Button onClick={() => setNewEntryVariants(true)} variant="contained" color="primary">
					Add new entry
				</Button>
			)}

			{!newEntryFormVisible && newEntryVariants && (
				<>
					<Box display="flex" flexWrap="wrap" gap={1} mb={1}>
						<Button
							onClick={() => setNewEntryFormVisible("Hospital")}
							variant="contained"
							color="primary"
						>
							Add new hospital entry
						</Button>
						<Button
							onClick={() => setNewEntryFormVisible("OccupationalHealthcare")}
							variant="contained"
							color="primary"
						>
							Add new occupationalHealthcare entry
						</Button>
						<Button
							onClick={() => setNewEntryFormVisible("HealthCheck")}
							variant="contained"
							color="primary"
						>
							Add new healthCheck entry
						</Button>
					</Box>
					<Box>
						<Button
							onClick={() => setNewEntryVariants(false)}
							variant="contained"
							color="error"
						>
							Cancel
						</Button>
					</Box>
				</>
			)}

			<Notification message={error} onClear={setError} />

			{newEntryFormVisible && (
				<EntryForm type={newEntryFormVisible} onCancel={setNewEntryFormVisible} patientID={patient.id} setError={setError} onEntryAdded={handleEntryAdded} diagnoses={diagnoses} />
			)}
		</div>
	);
};

export default PatientPage;