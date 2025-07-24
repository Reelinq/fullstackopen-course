import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network'
	});

	return {
		repositories: data ? data.repositories : undefined,
		error,
		loading,
		refetch,
	};
};

export default useRepositories;