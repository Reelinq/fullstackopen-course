import { z } from 'zod';
import { newEntrySchema } from './utils';

export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface PatientEntry extends NewPatientEntry {
	id: string;
	entries: Entry[];
}