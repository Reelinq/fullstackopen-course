import { format } from 'date-fns';
import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import Text from './Text'
import useUserReviews from '../hooks/useUserReviews';
import theme from '../theme'
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
	repositoryReview: {
		backgroundColor: theme.colors.itemBackground,
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	separator: {
		height: 10,
	},
	infoContainer: {
		flex: 1,
		flexShrink: 1,
	},
	reviewContainer: {
		...theme.position.unEvenFlexStart,
	},
	ratingBadge: {
		...theme.badges.ratingBadge
	},
	reviewManager: {
		...theme.position.spaceAroundHorisontalFlex,
		backgroundColor: theme.colors.itemBackground,
		paddingBottom: 15,
	},
	openButton: {
		...theme.buttons.defaultButton
	},
	deleteButton: {
		...theme.buttons.redButton
	},
})

const ReviewItem = ({ review }) => (
	<View style={styles.repositoryReview}>
		<View style={styles.reviewContainer}>
			<View style={styles.ratingBadge}>
				<Text color="blue">{review.rating}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text textWeight="bold">{review.repository.fullName}</Text>
				<Text textFont="ultrasmall" style={{ paddingVertical: 5 }}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
				<Text textFont="small">{review.text}</Text>
			</View>
		</View>
	</View >
)

const ReviewManager = ({ review, refetch }) => {
	const navigate = useNavigate();
	const [deleteReview] = useDeleteReview();

	const handleOpenRepo = () => {
		navigate(`/repositories/${review.repository.id}`);
	}
	const handleDeleteReview = () => {
		const reviewID = review.id

		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{ text: 'CANCEL' },
			{
				text: 'DELETE',
				onPress: async () => {
					try {
						await deleteReview({ id: reviewID });
						await refetch();
					} catch (e) {
						console.log(e);
					}
				}
			},
		]);
	}

	return (
		<View style={styles.reviewManager}>
			<Pressable style={styles.openButton} onPress={handleOpenRepo}>
				<Text color="white" fontWeight="bold">
					View Repository
				</Text>
			</Pressable>
			<Pressable style={styles.deleteButton} onPress={handleDeleteReview}>
				<Text color="white" fontWeight="bold">
					Delete Review
				</Text>
			</Pressable>
		</View>
	)
}

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
	const { reviews, refetch } = useUserReviews()

	if (!reviews) return

	return (
		<FlatList
			data={reviews}
			renderItem={({ item }) => <>
				<ReviewItem review={item.node} />
				<ReviewManager review={item.node} refetch={refetch} />
			</>}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.node.id}
		/>
	)
}

export default MyReviews