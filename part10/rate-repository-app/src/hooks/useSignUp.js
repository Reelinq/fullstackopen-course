import { useMutation } from "@apollo/client"
import { ADD_USER } from "../graphql/queries"

const useSignUp = () => {
	const [mutate, result] = useMutation(ADD_USER)

	const signUp = async ({ username, password }) => {
		const { data } = await mutate({
			variables: {
				user: {
					username,
					password
				}
			}
		})

		return { data };
	};

	return [signUp, result]
}

export default useSignUp