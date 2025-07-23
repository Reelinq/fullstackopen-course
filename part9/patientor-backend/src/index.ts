import { z } from 'zod';
import express from 'express';
import cors from 'cors';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';
import { newEntrySchema, newEntryUnionSchema } from './utils';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
	res.send(diagnoseService.getEntries());
});

app.get('/api/patients', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

app.post('/api/patients', (req, res) => {
	try {
		const newPatientEntry = newEntrySchema.parse(req.body);

		const addedEntry = patientService.addPatient(newPatientEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).send({ error: error.issues });
		} else {
			res.status(400).send({ error: 'unknown error' });
		}
	}
});

app.get('/api/patients/:id', (req, res) => {
	const patient = patientService.findById(String(req.params.id));
	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

app.post('/api/patients/:id/entries', (req, res) => {
	try {
		const patientId = req.params.id;
		const newEntry = newEntryUnionSchema.parse(req.body);

		const addedEntry = patientService.addEntry(patientId, newEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).send({ error: error.issues });
		} else {
			res.status(400).send({ error: 'unknown error' });
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});