import { useMutation, useApolloClient } from "@apollo/client"
import { LOGIN } from "../graphql/queries"
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [mutate, result] = useMutation(LOGIN)

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({
			variables: {
				credentials: {
					username,
					password
				}
			}
		})

		const accessToken = data.authenticate.accessToken;
		if (accessToken) {
			await authStorage.setAccessToken(accessToken);
			apolloClient.resetStore();
		}

		return { data };
	};

	return [signIn, result]
}

export default useSignIn