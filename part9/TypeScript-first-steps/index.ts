import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
		return res.status(400).json({
			error: "malformatted parameters"
		});
	}

	const bmi = calculateBmi(height, weight);

	return res.json({
		weight: weight,
		height: height,
		bmi: bmi
	});
});

app.post('/exercises', (req, res) => {
	if (!req.body.daily_exercises || !req.body.target) {
		return res.status(400).json({
			error: "parameters missing"
		});
	}

	if (!Array.isArray(req.body.daily_exercises) || isNaN(Number(req.body.target))) {
		return res.status(400).json({
			error: "malformatted parameters"
		});
	}

	for (const exercise of req.body.daily_exercises) {
		if (isNaN(Number(exercise))) {
			return res.status(400).json({
				error: "malformatted parameters"
			});
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return res.json(calculateExercises(req.body.daily_exercises, Number(req.body.target)));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});