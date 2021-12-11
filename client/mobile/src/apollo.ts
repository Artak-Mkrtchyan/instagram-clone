import { from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
	const token = await AsyncStorage.getItem('jwt');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const link = from([errorLink, httpLink]);

export const apolloClientOptions = {
	link: authLink.concat(link),
};
