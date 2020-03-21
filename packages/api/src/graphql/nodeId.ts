import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';

function serialize(value) {
  return Buffer.from(value).toString('base64');
}

function parse(value) {
  if (typeof value === 'string') {
    return Buffer.from(value, 'base64').toString();
  }
  throw new Error('NodeId has to be a string');
}

const NodeId = new GraphQLScalarType({
  name: 'NodeId',
  description: 'serializes and deserialized nodeIds',
  serialize,
  parseValue: parse,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return parse(ast.value);
    }
    throw new Error('NodeId has to be a string');
  },
});

export default NodeId;
