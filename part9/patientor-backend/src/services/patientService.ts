import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';


const patients: PatientEntry[] = patientData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
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

const findById = (id: string): PatientEntry | undefined => {
	const entry = patients.find(p => p.id === id);
	return entry;
};

export default { getNonSensitiveEntries, addPatient, findById };