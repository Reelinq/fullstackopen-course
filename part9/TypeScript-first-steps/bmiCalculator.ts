const calculateBmi = (height: number, weight: number): string => {
	const heightInMeters = height / 100
	const BMI = weight / (heightInMeters ** 2)

	if (BMI < 16) return 'Underweight (Severe thinness)'
	if (BMI < 17) return 'Underweight (Moderate thinness)'
	if (BMI < 18.5) return 'Underweight (Mild thinness)'
	if (BMI < 25) return 'Normal range'
	if (BMI < 30) return 'Overweight (Pre-obese)'
	if (BMI < 35) return 'Obese (Class I)'
	if (BMI < 40) return 'Obese (Class II)'
	return 'Obese(Class III)'
}

console.log(calculateBmi(180, 74))