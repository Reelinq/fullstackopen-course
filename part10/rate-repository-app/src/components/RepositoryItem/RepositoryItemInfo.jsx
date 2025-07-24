import { View, StyleSheet } from 'react-native';
import Text from '../Text'

const styles = StyleSheet.create({
	infoContainer: {
		flex: 1,
		flexShrink: 1,
	},
})

const RepositoryItemInfo = ({ fullName, description, language }) => (
	<View style={styles.infoContainer}>
		<Text textWeight="bold">{fullName}</Text>
		<Text textFont="small" style={{ paddingVertical: 5 }}>{description}</Text>
		<Text type="badge">{language}</Text>
	</View>
)

export default RepositoryItemInfo