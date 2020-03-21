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

async function lambdaMiddleware({ event: { headers } }) {
  return authenticateHeader(headers.Authorization || headers.authorization);
}

async function httpMiddleware(req) {
  return authenticateHeader(req.headers.Authorization || req.headers.authorization);
}

export { lambdaMiddleware, httpMiddleware };
