import { format } from 'date-fns';
import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text'
import useUserReviews from '../hooks/useUserReviews';
import theme from '../theme'

const styles = StyleSheet.create({
	repositoryReview: {
		backgroundColor: theme.colors.itemBackground,
		padding: 15,
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

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
	const { reviews } = useUserReviews()

	if (!reviews) return

	return (
		<FlatList
			data={reviews}
			renderItem={({ item }) => <ReviewItem review={item.node} />}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.node.id}
		/>
	)
}

export default MyReviews