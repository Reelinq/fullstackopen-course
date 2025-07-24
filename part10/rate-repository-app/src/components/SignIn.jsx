import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import theme from '../theme'

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: theme.colors.itemBackground
	},
	input: {
		...theme.forms.input
	},
})

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values)
	}

	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			onSubmit={onSubmit}
		>{({ handleChange, handleSubmit, values }) => (
			<View style={styles.container}>
				<TextInput
					placeholder="Username"
					value={values.username}
					onChangeText={handleChange('username')}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					value={values.password}
					onChangeText={handleChange('password')}
					secureTextEntry
					style={styles.input}
				/>
				<Button onPress={handleSubmit} title="Sign In" />
			</View>
		)}
		</Formik>
	)
}

export default SignIn