import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect name');
	}

	return name;
};

const parseSSN = (ssn: unknown): string | undefined => {
	if (ssn === undefined) return ssn;

	if (!isString(ssn)) {
		throw new Error('Incorrect SSN');
	}

	return ssn;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect occupation');
	}

	return occupation;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect date: ' + date);
	}
	return date;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect gender: ' + gender);
	}
	return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
		const newEntry: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
			ssn: parseSSN((object as any).ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};

		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;