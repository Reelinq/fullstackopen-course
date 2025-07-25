import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import Text from './Text';
import theme from '../theme'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
		...theme.forms.input,
	},
	inputError: {
		borderColor: '#d73a4a',
	},
})

export const SignInContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={{ username: '', password: '' }}
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
					<Button title="SIGN IN" onPress={handleSubmit} />
				</View>
			)}
		</Formik>
	)
}

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			if (data.authenticate.accessToken) navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn