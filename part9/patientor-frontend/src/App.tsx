import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();

		const fetchDiagnoses = async () => {
			try {
				const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
				setDiagnoses(data);
			} catch (error) {
				console.error('Error fetching diagnoses:', error);
			}
		};

		fetchDiagnoses();
	}, []);

	const match = useMatch('/patients/:id');
	const patient = match
		? patients.find(patient => patient.id === String(match.params.id))
		: null;

	return (
		<div className="App">
			<Container>
				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>
				<Button component={Link} to="/" variant="contained" color="primary">
					Home
				</Button>
				<Divider hidden />
				<Routes>
					<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
					<Route path="/patients/:id" element={<PatientPage patient={patient} diagnoses={diagnoses} />} />
				</Routes>
			</Container>
		</div>
	);
};

export default App;
