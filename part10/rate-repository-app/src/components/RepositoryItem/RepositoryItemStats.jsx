import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import Text from '../Text'

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
		textAlign: 'center',
	},
	statsText: {
		textAlign: 'center',
	}
});

const RepositoryItemStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => (
	<View style={styles.stats}>
		<View style={styles.statsItem}>
			<Text textWeight="bold" style={styles.statsBoldText}>{formatStatCount(stargazersCount)}</Text>
			<Text textFont="small" style={styles.statsText}>Stars</Text>
		</View>
		<View style={styles.statsItem}>
			<Text textWeight="bold" style={styles.statsBoldText}>{formatStatCount(forksCount)}</Text>
			<Text textFont="small" style={styles.statsText}>Forks</Text>
		</View>
		<View style={styles.statsItem}>
			<Text textWeight="bold" style={styles.statsBoldText}>{formatStatCount(reviewCount)}</Text>
			<Text textFont="small" style={styles.statsText}>Reviews</Text>
		</View>
		<View style={styles.statsItem}>
			<Text textWeight="bold" style={styles.statsBoldText}>{formatStatCount(ratingAverage)}</Text>
			<Text textFont="small" style={styles.statsText}>Rating</Text>
		</View>
	</View>
);

export default RepositoryItemStats;