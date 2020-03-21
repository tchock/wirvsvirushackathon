import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { resolvers, typeDefs } from './resolvers';


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://q97xw1f31g.execute-api.us-east-1.amazonaws.com/dev/graphql',
  typeDefs,
  resolvers,
});
