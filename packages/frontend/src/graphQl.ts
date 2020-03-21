import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://q97xw1f31g.execute-api.us-east-1.amazonaws.com/dev/graphql',
});
