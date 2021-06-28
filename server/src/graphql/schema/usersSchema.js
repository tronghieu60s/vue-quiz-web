const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require("graphql");

const UsersType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    _id: { type: GraphQLString },
    user_username: { type: GraphQLString },
    user_password: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

const query = {
  user: {
    type: UsersType,
    args: {
      key: { type: GraphQLNonNull(GraphQLString) },
      value: { type: GraphQLNonNull(GraphQLString) },
    },
  },
  users: { type: GraphQLList(UsersType) },
};

const mutation = {
  createUser: {
    type: UsersType,
    args: {
      user_username: { type: GraphQLNonNull(GraphQLString) },
      user_password: { type: GraphQLNonNull(GraphQLString) },
    },
  },
  updateUserById: {
    type: UsersType,
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
      user_username: { type: GraphQLString },
      user_password: { type: GraphQLString },
    },
  },
};

module.exports = { query, mutation };
