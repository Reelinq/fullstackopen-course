import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default { getNonSensitiveEntries };