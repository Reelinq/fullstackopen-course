import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

export const SortingPicker = ({ selectedSorting, setSelectedSorting }) => (
	<Picker
		selectedValue={selectedSorting}
		onValueChange={(itemValue) => setSelectedSorting(itemValue)}
	>
		<Picker.Item label="Latest repositories" value="latest" />
		<Picker.Item label="Highest rated repositories" value="highest" />
		<Picker.Item label="Lowest rated repositories" value="lowest" />
	</Picker>
)

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, selectedSorting, setSelectedSorting }) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.id}
			ListHeaderComponent={() => (
				<SortingPicker selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} />
			)}
			renderItem={({ item }) => (
				<Link to={`/repositories/${item.id}`}>
					<RepositoryItem item={item} />
				</Link>
			)}
		/>
	);
};

const RepositoryList = () => {
	const [selectedSorting, setSelectedSorting] = useState('latest');

	const getSortingParams = (sorting) => {
		switch (sorting) {
			case 'latest': return { order: 'CREATED_AT', direction: 'DESC' };
			case 'highest': return { order: 'RATING_AVERAGE', direction: 'DESC' };
			case 'lowest': return { order: 'RATING_AVERAGE', direction: 'ASC' };
			default: return { order: 'CREATED_AT', direction: 'DESC' };
		}
	};

	const sortingParams = getSortingParams(selectedSorting);
	const { repositories } = useRepositories(sortingParams);

	return (
		<RepositoryListContainer
			repositories={repositories}
			selectedSorting={selectedSorting}
			setSelectedSorting={setSelectedSorting}
		/>
	)
};

export default RepositoryList;