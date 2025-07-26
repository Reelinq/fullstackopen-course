import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ({ order, direction, searchKeyword, first }) => {
	const variables = { orderBy: order, orderDirection: direction, searchKeyword, first }

	const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
		variables,
		fetchPolicy: 'cache-and-network'
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	return {
		repositories: data?.repositories,
		fetchMore: handleFetchMore,
		loading,
		...result,
	};
};

export default useRepositories;