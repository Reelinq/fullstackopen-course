import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.bar,
	},
	content: {
		height: 60,
	},
	contentContainer: {
		width: 400,
		...theme.position.spaceAroundHorisontalFlex
	}
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<ScrollView horizontal showsHorizontalScrollIndicator>
					<View style={styles.contentContainer}>
						<AppBarTab content={"Repositories"} endpoint={'/'} style={styles.item} />
						<AppBarTab content={"Sign In"} endpoint={'/signin'} style={styles.item} />
					</View>
				</ScrollView>
			</View>
		</View >
	);
};

export default AppBar;