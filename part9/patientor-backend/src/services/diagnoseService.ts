import diagnoseData from '../../data/diagnoses';
import { NonSensitiveDiagnoseEntry, DiagnoseEntry } from '../types/DiagnoseEntry';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getEntries = (): DiagnoseEntry[] => {
	return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
	return diagnoses.map(({ code, name }) => ({
		code,
		name
	}));
};

export default { getEntries, getNonSensitiveEntries };