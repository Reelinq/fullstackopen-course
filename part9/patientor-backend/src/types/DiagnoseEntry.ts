export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;