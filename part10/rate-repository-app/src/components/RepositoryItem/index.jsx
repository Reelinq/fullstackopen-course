import { View, StyleSheet, Pressable, Linking } from 'react-native'
import theme from '../../theme'
import RepositoryItemStats from './RepositoryItemStats'
import RepositoryItemInfo from './RepositoryItemInfo'
import RepositoryItemImage from './RepositoryItemImage'
import Text from '../Text'

const styles = StyleSheet.create({
	repositoryItem: {
		backgroundColor: theme.colors.itemBackground,
		padding: 15,
	},
	imageInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 15,
		marginBottom: 15,
	},
	githubButton: {
		...theme.buttons.defaultButton
	},
})

const RepositoryItem = ({ item, showGitHubButton = false }) => {
	const handleOpenInGitHub = () => {
		if (item.url) Linking.openURL(item.url);
	};

	return (
		<View testID="repositoryItem" style={styles.repositoryItem}>
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
			{showGitHubButton && (
				<Pressable style={styles.githubButton} onPress={handleOpenInGitHub}>
					<Text color="white" fontWeight="bold">
						Open in GitHub
					</Text>
				</Pressable>
			)}
		</View>
	)
}

export default RepositoryItem