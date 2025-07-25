import { GET_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepo = (id) => {
	const { data, error, loading, refetch } = useQuery(GET_REPO, {
		variables: { repositoryId: id },
		fetchPolicy: 'cache-and-network',
	});

	return {
		repo: data?.repository,
		error,
		loading,
		refetch,
	};
}

export default useRepo;