import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	text: {
		fontWeight: 'bold',
		color: theme.colors.barText,
	},
});

const AppBarTab = ({ content, endpoint }) => {
	return (
		<View>
			<Link to={endpoint}>
				<Text style={styles.text}>{content}</Text>
			</Link>
		</View>
	)
};

export default AppBarTab;