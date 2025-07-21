import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';


const patients: PatientEntry[] = patientData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		id: uuid(),
		...entry
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default { getNonSensitiveEntries, addPatient };