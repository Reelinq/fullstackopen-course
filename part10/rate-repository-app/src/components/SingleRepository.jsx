import { useParams } from 'react-router-native';
import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepo from '../hooks/useRepo';

const SingleRepository = () => {
	const { id } = useParams();
	const { repo } = useRepo(id);

	if (repo) return (
		<View>
			<RepositoryItem item={repo} showGitHubButton={true} />
		</View>
	);
};

export default SingleRepository;