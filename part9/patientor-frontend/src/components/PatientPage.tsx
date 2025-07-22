import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientPageProps {
	patient: Patient | undefined | null
}

const PatientPage = ({ patient }: PatientPageProps) => {
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
		</div>
	);
};

export default PatientPage;