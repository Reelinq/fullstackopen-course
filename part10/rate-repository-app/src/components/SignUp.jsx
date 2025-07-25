import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import Text from './Text';
import theme from '../theme'
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(5, 'Username must be at least 5 characters long')
		.max(30, 'Username must be at most 30 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'Password must be at least 5 characters long')
		.max(50, 'Password must be at most 50 characters long')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required'),
});

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: theme.colors.itemBackground
	},
	input: {
		...theme.forms.input,
	},
	inputError: {
		borderColor: '#d73a4a',
	},
})

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={{ username: '', password: '', confirmPassword: '' }}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleChange, handleSubmit, values, errors }) => (
				<View style={styles.container}>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.username && styles.inputError]}
							placeholder="Username"
							value={values.username}
							onChangeText={handleChange('username')}
						/>
						{errors.username && (
							<Text style={{ color: '#d73a4a' }}>{errors.username}</Text>
						)}
					</View>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.password && styles.inputError]}
							placeholder="Password"
							value={values.password}
							onChangeText={handleChange('password')}
							secureTextEntry
						/>
						{errors.password && (
							<Text style={{ color: '#d73a4a' }}>{errors.password}</Text>
						)}
					</View>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.confirmPassword && styles.inputError]}
							placeholder="Confirm password"
							value={values.confirmPassword}
							onChangeText={handleChange('confirmPassword')}
							secureTextEntry
						/>
						{errors.confirmPassword && (
							<Text style={{ color: '#d73a4a' }}>{errors.confirmPassword}</Text>
						)}
					</View>
					<Button title="Sign up" onPress={handleSubmit} />
				</View>
			)}
		</Formik>
	)
}

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signUp({ username, password });
			const { data } = await signIn({ username, password });
			if (data.authenticate.accessToken) navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp