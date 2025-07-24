import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.Bar,
	},
	content: {
		height: 60,
		...theme.position.spaceAroundHorisontalFlex,
	},
	item: {
		flexGrow: 0,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<AppBarTab content={"Repositories"} style={styles.item} />
			</View>
		</View>
	);
};

export default AppBar;