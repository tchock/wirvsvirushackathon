import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './graphql';
// import { lambdaMiddleware } from './authentication';
// import requestIdContext from './misc/requestIdContext';
// import logger from './misc/logger';

const server = new ApolloServer({
  schema,
  context: async (...args) => {
    // const { transactionId } = requestIdContext();
    const { headers } = args[0].event;
    const referer = headers.Referer || headers.referer;
    const lambdaRequestId = args[0].event.requestContext.requestId;
    return {
      // ...(await lambdaMiddleware(...args)),
      // transactionId,
      // logger: logger.child({
      //   service: 'api',
      //   transactionId,
      //   lambdaRequestId,
      //   referer,
      //   environment: process.env.STAGE,
      // }),
    };
  },
  debug: true,
  tracing: true,
  introspection: true,
});

export default server;
