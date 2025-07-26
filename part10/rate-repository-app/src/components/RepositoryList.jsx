import React from 'react';
import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	searchbarContainer: {
		backgroundColor: theme.colors.mainBackground,
		padding: 15,
	},
	searchbar: {
		...theme.forms.Searchbar
	},
});

export const RepositorySearchbar = ({ searchQuery, setSearchQuery }) => {
	return (
		<View style={styles.searchbarContainer}>
			<Searchbar
				placeholder="Search"
				onChangeText={setSearchQuery}
				value={searchQuery}
				style={styles.searchbar}
			/>
		</View>
	);
};

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

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const props = this.props;

		return (
			<View>
				<RepositorySearchbar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
				/>
				<SortingPicker
					selectedSorting={props.selectedSorting}
					setSelectedSorting={props.setSelectedSorting}
				/>
			</View>
		);
	};

	render() {
		const { repositories } = this.props;
		const repositoryNodes = repositories
			? repositories.edges.map((edge) => edge.node)
			: [];

		return (
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={this.renderHeader}
				renderItem={({ item }) => (
					<Link to={`/repositories/${item.id}`}>
						<RepositoryItem item={item} />
					</Link>
				)}
				onEndReached={this.props.onEndReach}
				onEndReachedThreshold={0.5}
			/>
		);
	}
}

const RepositoryList = () => {
	const [selectedSorting, setSelectedSorting] = useState('latest');
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

	const getSortingParams = (sorting) => {
		switch (sorting) {
			case 'latest': return { order: 'CREATED_AT', direction: 'DESC' };
			case 'highest': return { order: 'RATING_AVERAGE', direction: 'DESC' };
			case 'lowest': return { order: 'RATING_AVERAGE', direction: 'ASC' };
			default: return { order: 'CREATED_AT', direction: 'DESC' };
		}
	};

	const sortingParams = getSortingParams(selectedSorting);
	const { repositories, fetchMore } = useRepositories({
		first: 8,
		...sortingParams,
		searchKeyword: debouncedSearchQuery
	});

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			selectedSorting={selectedSorting}
			setSelectedSorting={setSelectedSorting}
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			onEndReach={onEndReach}
		/>
	)
};

export default RepositoryList;