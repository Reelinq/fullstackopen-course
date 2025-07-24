import { View, StyleSheet } from 'react-native'
import theme from '../../theme'
import RepositoryItemStats from './RepositoryItemStats'
import RepositoryItemInfo from './RepositoryItemInfo'
import RepositoryItemImage from './RepositoryItemImage'

const styles = StyleSheet.create({
	repositoryItem: {
		backgroundColor: theme.colors.repositoryItemBackground,
		padding: 15,
	},
	imageInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 15,
		marginBottom: 15,
	}
})

const RepositoryItem = ({ item }) => (
	<View style={styles.repositoryItem}>
		<View style={styles.imageInfoContainer}>
			<RepositoryItemImage avatarUrl={item.ownerAvatarUrl} />
			<RepositoryItemInfo fullName={item.fullName} description={item.description} language={item.language} />
		</View>
		<RepositoryItemStats
			stargazersCount={item.stargazersCount}
			forksCount={item.forksCount}
			reviewCount={item.reviewCount}
			ratingAverage={item.ratingAverage}
		/>
	</View>
)

export default RepositoryItem