import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = () => {
	return axios
		.get<DiaryEntry[]>(baseUrl)
		.then(response => response.data)
}

export const createDiaryEntry = async (object: NewDiaryEntry) => {
	try {
		const response = await axios.post<DiaryEntry>(baseUrl, object);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data || 'Axios error occurred');
		} else {
			throw new Error(String(error));
		}
	};
}