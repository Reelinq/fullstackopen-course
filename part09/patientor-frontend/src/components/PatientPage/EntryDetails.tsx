import { type Diagnosis, type Entry, type HospitalEntry, type OccupationalHealthcareEntry, type HealthCheckEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow, orange, red } from '@mui/material/colors';

const HospitalEntry: React.FC<{ entry: HospitalEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
	return (
		<div>
			<p>{entry.date} <LocalHospitalIcon /></p>
			<p>{entry.description}</p>
			<p>{entry.discharge.date} {entry.discharge.criteria}</p>
			<p>diagnose by {entry.specialist}</p>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => (
						<li key={code}>
							{code} {diagnoses.find(d => d.code === code)?.name || ''}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
	return (
		<div>
			<p>{entry.date} <MedicalServicesIcon /> {entry.employerName}</p>
			<p>{entry.description}</p>
			{entry.sickLeave && (
				<>
					<p>Healthcare started: {entry.sickLeave.startDate}</p>
					<p>Healthcare ended: {entry.sickLeave.endDate}</p>
				</>
			)}
			<p>diagnose by {entry.specialist}</p>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => (
						<li key={code}>
							{code} {diagnoses.find(d => d.code === code)?.name || ''}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
	return (
		<div>
			<p>{entry.date} <HealthAndSafetyIcon /></p>
			<p>{entry.description}</p>
			{entry.healthCheckRating === 0 && <FavoriteIcon style={{ color: green[500] }} />}
			{entry.healthCheckRating === 1 && <FavoriteIcon style={{ color: yellow[700] }} />}
			{entry.healthCheckRating === 2 && <FavoriteIcon style={{ color: orange[700] }} />}
			{entry.healthCheckRating === 3 && <FavoriteIcon style={{ color: red[500] }} />}
			<p>diagnose by {entry.specialist}</p>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map(code => (
						<li key={code}>
							{code} {diagnoses.find(d => d.code === code)?.name || ''}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
		case "HealthCheck":
			return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;