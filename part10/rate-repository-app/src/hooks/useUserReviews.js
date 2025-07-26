import { USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useUserReviews = () => {
	const { data, error, loading, refetch } = useQuery(USER, {
		variables: { includeReviews: true },
		fetchPolicy: 'cache-and-network',
	});

	return {
		reviews: data?.me?.reviews?.edges || [],
		error,
		loading,
		refetch,
	};
}

export default useUserReviews;