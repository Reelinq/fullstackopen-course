import { GET_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepo = (id, first) => {
	const variables = { repositoryId: id, first };

	const { data, loading, fetchMore, refetch } = useQuery(GET_REPO, {
		variables,
		fetchPolicy: 'cache-and-network',
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables,
			},
		});
	};

	return {
		repo: data?.repository,
		fetchMore: handleFetchMore,
		loading,
		refetch,
	};
}

export default useRepo;