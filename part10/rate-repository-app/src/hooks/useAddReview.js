import { useMutation } from "@apollo/client"
import { ADD_REVIEW } from "../graphql/queries"

const useAddReview = () => {
	const [mutate, result] = useMutation(ADD_REVIEW)

	const addReview = async ({ ownerName, repositoryName, rating, text }) => {
		const { data } = await mutate({
			variables: {
				review: {
					ownerName,
					repositoryName,
					rating,
					text,
				}
			}
		})

		return { data };
	};

	return [addReview, result]
}

export default useAddReview