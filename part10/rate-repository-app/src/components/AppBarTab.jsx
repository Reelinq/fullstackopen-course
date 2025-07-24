import { StyleSheet, Text } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	text: {
		fontWeight: 'bold',
		color: theme.colors.barText,
	}
});

const AppBarTab = ({ content, endpoint }) => {
	return (
		<Link to={endpoint}>
			<Text style={styles.text}>{content}</Text>
		</Link>
	)
};

export default AppBarTab;