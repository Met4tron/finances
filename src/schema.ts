import { buildSchemaSync } from 'type-graphql';
import UserResolver from './modules/user/UserResolver'

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  validate: true
});

export default schema;
