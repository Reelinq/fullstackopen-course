import { Patient, Diagnosis } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';

interface PatientPageProps {
	patient: Patient | undefined | null
	diagnoses: Diagnosis[]
}

const PatientPage = ({ patient, diagnoses }: PatientPageProps) => {
	if (!patient) return <div>Patient not found</div>;

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
		</div>
	);
};

export default PatientPage;