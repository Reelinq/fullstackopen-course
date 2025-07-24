import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const formatStatCount = (count) => {
	if (count >= 1000) {
		const result = (count / 1000).toFixed(1);
		return result.endsWith('.0') ? result.slice(0, -2) + 'k' : result + 'k';
	}
	return count.toString();
};

const styles = StyleSheet.create({
	stats: {
		...theme.position.spaceAroundHorisontalFlex,
	},
	statsItem: {
		alignItems: 'center',
	},
	statsBoldText: {
		...theme.texts.boldText,
		textAlign: 'center',
	},
	statsText: {
		...theme.texts.Text,
		textAlign: 'center',
	}
});

const RepositoryItemStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => (
	<View style={styles.stats}>
		<View style={styles.statsItem}>
			<Text style={styles.statsBoldText}>{formatStatCount(stargazersCount)}</Text>
			<Text style={styles.statsText}>Stars</Text>
		</View>
		<View style={styles.statsItem}>
			<Text style={styles.statsBoldText}>{formatStatCount(forksCount)}</Text>
			<Text style={styles.statsText}>Forks</Text>
		</View>
		<View style={styles.statsItem}>
			<Text style={styles.statsBoldText}>{formatStatCount(reviewCount)}</Text>
			<Text style={styles.statsText}>Reviews</Text>
		</View>
		<View style={styles.statsItem}>
			<Text style={styles.statsBoldText}>{formatStatCount(ratingAverage)}</Text>
			<Text style={styles.statsText}>Rating</Text>
		</View>
	</View>
);

export default RepositoryItemStats;