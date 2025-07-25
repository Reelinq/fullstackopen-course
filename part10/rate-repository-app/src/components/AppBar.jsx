import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/client';
import { CHECK_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { Pressable } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

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
	const navigate = useNavigate();

	const { data } = useQuery(CHECK_USER, {
		fetchPolicy: 'cache-and-network',
	});
	const apolloClient = useApolloClient()
	const authStorage = useAuthStorage()

	const onSignOut = async () => {
		await authStorage.removeAccessToken()
		await apolloClient.resetStore()
		navigate('/');
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<ScrollView horizontal showsHorizontalScrollIndicator>
					<View style={styles.contentContainer}>
						<AppBarTab content={"Repositories"} endpoint={'/'} style={styles.item} />
						{data?.me ? (
							<>
								<AppBarTab content="Create a review" endpoint="/createreview" style={styles.item} />
								<Pressable onPress={onSignOut}>
									<Text color="white" textWeight="bold">Sign Out</Text>
								</Pressable>
							</>
						) : (
							<AppBarTab content="Sign In" endpoint="/signin" style={styles.item} />
						)}
					</View>
				</ScrollView>
			</View>
		</View >
	);
};

export default AppBar;