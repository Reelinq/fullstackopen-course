import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import Text from './Text';
import theme from '../theme'
import * as yup from 'yup';
import useAddReview from '../hooks/useAddReview';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
	ownerName: yup
		.string()
		.required("Repository owner name is required"),
	repositoryName: yup
		.string()
		.required("Repository name is required"),
	rating: yup
		.number()
		.min(0, "Rating must be at least 0")
		.max(100, "Rating must be at most 100")
		.required("Rating is required"),
	review: yup
		.string()
		.optional()
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

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: '',
	review: '',
};

export const ReviewFormContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleChange, handleSubmit, values, errors }) => (
				<View style={styles.container}>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.ownerName && styles.inputError]}
							placeholder="Repository owner name"
							value={values.ownerName}
							onChangeText={handleChange('ownerName')}
						/>
						{errors.ownerName && (
							<Text style={{ color: '#d73a4a' }}>{errors.ownerName}</Text>
						)}
					</View>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.repositoryName && styles.inputError]}
							placeholder="Repository name"
							value={values.repositoryName}
							onChangeText={handleChange('repositoryName')}
						/>
						{errors.repositoryName && (
							<Text style={{ color: '#d73a4a' }}>{errors.repositoryName}</Text>
						)}
					</View>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							style={[styles.input, errors.rating && styles.inputError]}
							placeholder="Rating between 0 and 100"
							value={values.rating}
							onChangeText={handleChange('rating')}
						/>
						{errors.rating && (
							<Text style={{ color: '#d73a4a' }}>{errors.rating}</Text>
						)}
					</View>
					<View style={{ marginBottom: 15 }}>
						<TextInput
							multiline
							style={[styles.input, errors.review && styles.inputError]}
							placeholder="Review"
							value={values.review}
							onChangeText={handleChange('review')}
						/>
						{errors.review && (
							<Text style={{ color: '#d73a4a' }}>{errors.review}</Text>
						)}
					</View>
					<Button title="Create a review" onPress={handleSubmit} />
				</View>
			)}
		</Formik>
	)
}

const ReviewForm = () => {
	const [addReview] = useAddReview();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { ownerName, repositoryName, rating, review } = values;

		try {
			const { data } = await addReview({
				ownerName,
				repositoryName,
				rating: Number(rating),
				text: review
			});

			const repositoryId = data.createReview.repository.id
			navigate(`/repositories/${repositoryId}`)
		} catch (e) {
			console.log(e);
		}
	};

	return <ReviewFormContainer onSubmit={onSubmit} />
}

export default ReviewForm