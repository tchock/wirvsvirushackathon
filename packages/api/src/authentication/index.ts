import { AuthenticationError } from 'apollo-server-lambda';
import authenticate from './authenticate';

class NoAuthHeaderError extends AuthenticationError {}
class WrongTokenTypeError extends AuthenticationError {}
class InvalidTokenTypeError extends AuthenticationError {}

async function authenticateHeader(header) {
  if (!header) {
    throw new NoAuthHeaderError('No authorization header found');
  }

  const [tokenType, token] = header.split(' ');

  if (tokenType !== 'Bearer') {
    throw new WrongTokenTypeError('Wrong token type');
  }

  try {
    return { user: await authenticate(token) };
  } catch (e) {
    throw new InvalidTokenTypeError(e.message);
  }
}

const subs = {
  customer: 'customerId',
  store: 'storeId',
};

function fakeAuth(headers) {
  const subMapKey = headers.authorization || 'customer';
  return {
    user: {
      iss: 'https://outofthebox.eu.auth0.com/',
      sub: subs[subMapKey],
      aud: ['api.outofthebox.com', 'https://outofthebox.eu.auth0.com/userinfo'],
      iat: 1579344887,
      exp: 1579352087,
      azp: 'wiBC7LZCn4zmRVq5zEIMVuC9xkA9vRYJ',
      scope: 'openid profile',
      permissions: ['access'],
    },
  };
}

async function lambdaMiddleware({ event: { headers } }) {
  return fakeAuth(headers);
  // return authenticateHeader(headers.Authorization || headers.authorization);
}

async function httpMiddleware(req) {
  return authenticateHeader(req.headers.Authorization || req.headers.authorization);
}

export { lambdaMiddleware, httpMiddleware };
