import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	text: {
		fontWeight: 'bold',
		color: theme.colors.BarText,
	}
});

const AppBarTab = ({ content }) => {
	return <Pressable>
		<Text style={styles.text}>{content}</Text>
	</Pressable>;
};

export default AppBarTab;