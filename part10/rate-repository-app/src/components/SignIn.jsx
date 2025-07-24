import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import Text from './Text';
import theme from '../theme'
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.required('Password is required'),
});

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: theme.colors.itemBackground
	},
	input: {
		...theme.forms.input
	},
	inputError: {
		borderColor: '#d73a4a',
	},
})

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values)
	}

	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>{({ handleChange, handleSubmit, values, errors }) => (
			<View style={styles.container}>
				<View style={{ marginBottom: 10 }}>
					<TextInput
						placeholder="Username"
						value={values.username}
						onChangeText={handleChange('username')}
						style={[
							styles.input,
							errors.username && styles.inputError,
						]}
					/>
					{errors.username && (
						<Text color="error" font="small">{errors.username}</Text>
					)}
				</View>
				<View style={{ marginBottom: 10 }}>
					<TextInput
						placeholder="Password"
						value={values.password}
						onChangeText={handleChange('password')}
						secureTextEntry
						style={[
							styles.input,
							errors.password && styles.inputError,
						]}
					/>
					{errors.password && (
						<Text color="error" font="small">{errors.password}</Text>
					)}
				</View>
				<Button onPress={handleSubmit} title="Sign In" />
			</View>
		)}
		</Formik>
	)
}

export default SignIn