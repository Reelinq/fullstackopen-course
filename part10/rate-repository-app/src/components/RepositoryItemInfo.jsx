import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	infoContainer: {
		flex: 1,
		flexShrink: 1,
	},
	infoText: {
		...theme.texts.smallText,
		paddingVertical: 5,
	},
	infoBoldText: {
		...theme.texts.boldText,
	},
	languageBadge: {
		...theme.badges.languageBadge,
	}
})

const RepositoryItemInfo = ({ fullName, description, language }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoBoldText}>{fullName}</Text>
		<Text style={styles.infoText}>{description}</Text>
		<Text style={styles.languageBadge}>{language}</Text>
	</View>
)

export default RepositoryItemInfo