import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(
		`${apiBaseUrl}/patients`
	);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients`,
		object
	);

	return data;
};

const createEntry = async (patientId: string, object: EntryWithoutId) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${patientId}/entries`,
		object
	);

	return data;
};

export default {
	getAll, create, createEntry
};

