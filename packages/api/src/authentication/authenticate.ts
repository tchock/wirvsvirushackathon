import jwt, { VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://outofthebox.eu.auth0.com/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

const options: VerifyOptions = {
  // Validate the audience and the issuer.
  issuer: `https://outofthebox.eu.auth0.com/`,
  algorithms: ['RS256'],
  audience: 'api.outofthebox.com',
};

async function authenticate(token) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, getKey, options, (err, decoded: any) => {
      if (err) {
        reject(err);
        return;
      }

      if (!decoded.permissions.includes('access')) {
        reject(new Error('Access denied to application'));
      }

      resolve(decoded);
    })
  );
}

export default authenticate;
