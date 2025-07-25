import { format } from 'date-fns';
import { useParams } from 'react-router-native'
import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text'
import RepositoryItem from './RepositoryItem'
import useRepo from '../hooks/useRepo'
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

const RepositoryInfo = ({ repo }) => (
	<View>
		<RepositoryItem item={repo} showGitHubButton={true} />
		<ItemSeparator />
	</View>
)

const ReviewItem = ({ review }) => (
	<View style={styles.repositoryReview}>
		<View style={styles.reviewContainer}>
			<View style={styles.ratingBadge}>
				<Text color="blue">{review.rating}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text textWeight="bold">{review.user.username}</Text>
				<Text textFont="ultrasmall" style={{ paddingVertical: 5 }}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
				<Text textFont="small">{review.text}</Text>
			</View>
		</View>
	</View >
)

const ItemSeparator = () => <View style={styles.separator} />

const SingleRepository = () => {
	const { id } = useParams()
	const { repo } = useRepo(id)

	if (!repo) return

	const reviews = repo.reviews.edges
	return (
		<FlatList
			data={reviews}
			renderItem={({ item }) => <ReviewItem review={item.node} />}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.node.id}
			ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
		/>
	)
}

export default SingleRepository