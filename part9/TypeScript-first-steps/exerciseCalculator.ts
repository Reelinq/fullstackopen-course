interface MultiplyValues {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

const calculateExercises = (days: number[], target: number): MultiplyValues => {
	const MultiplyValues = {
		periodLength: days.length,
		trainingDays: 0,
		success: false,
		rating: 2,
		ratingDescription: 'you passed the target, well done',
		target,
		average: 0
	}

	let sum = 0

	for (const day of days) {
		if (day !== 0) MultiplyValues.trainingDays++
		sum += day
	}

	MultiplyValues.average = sum / MultiplyValues.periodLength
	MultiplyValues.success = MultiplyValues.average >= MultiplyValues.target
	if (!MultiplyValues.success) {
		MultiplyValues.rating = 1
		MultiplyValues.ratingDescription = 'not bad, but horrible'
	} else if (MultiplyValues.average / 2 >= target) {
		MultiplyValues.rating = 3
		MultiplyValues.ratingDescription = 'amazing job, you are twice as good'
	}

	return MultiplyValues
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))