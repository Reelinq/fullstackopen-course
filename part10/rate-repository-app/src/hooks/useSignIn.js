import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/queries"

const useSignIn = () => {
	const [mutate, result] = useMutation(LOGIN)

	const signIn = async ({ username, password }) => {
		const result = await mutate({
			variables: {
				credentials: {
					username,
					password
				}
			}
		})

		return result
	}

	return [signIn, result]
}

export default useSignIn