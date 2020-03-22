import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { resolvers, typeDefs } from './resolvers';


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://hq4vnzt36e.execute-api.us-east-1.amazonaws.com/staging/graphql',
  typeDefs,
  resolvers,
});
