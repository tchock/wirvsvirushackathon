import server from './apolloServer';

export const handler = server.createHandler({
  cors: {
    origin: '*',
  },
});
