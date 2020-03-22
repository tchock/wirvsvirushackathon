import { printSchema } from 'graphql';
import { schema } from '../src/graphql';

test(`exported schema`, async () => {
  expect(printSchema(schema)).toMatchSnapshot();
});
