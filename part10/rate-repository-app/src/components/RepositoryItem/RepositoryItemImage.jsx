import { View, StyleSheet, Image } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	imageContainer: {
		flexGrow: 0,
	},
	Logo: {
		...theme.images.smallRoundedImage
	}
})

const RepositoryItemImage = ({ avatarUrl }) => (
	<View style={styles.imageContainer}>
		<Image
			style={styles.Logo}
			source={{ uri: `${avatarUrl}` }}
		/>
	</View>
)

export default RepositoryItemImage