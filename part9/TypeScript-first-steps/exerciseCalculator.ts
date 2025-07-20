const parseArgumentsExerciseCaluclator = (args: string[]): [days: number[], target: number] => {
	if (args.length < 4) throw new Error('Not enough arguments')

	const target = Number(args[2])
	if (isNaN(target)) throw new Error('Provided values were not numbers!')

	const days = args.slice(3).map(day => Number(day))
	for (const arg of days) {
		if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!')
	}
	return [days, target]
}

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

const [days, target] = parseArgumentsExerciseCaluclator(process.argv)
console.log(calculateExercises(days, target))