import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
	return new ApolloClient({
		uri: 'http://10.45.222.82:4000/graphql',
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;