import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: (user) => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    active: {
      type: GraphQLBoolean,
      resolve: (user) => user.active,
    },
  }),
});

export default UserType;
