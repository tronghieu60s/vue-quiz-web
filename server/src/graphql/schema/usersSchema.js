const { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");
const { UsersType } = require("../types");

const query = {
  allUsers: { type: GraphQLList(UsersType) },
  getUsers: {
    type: GraphQLList(UsersType),
    args: {
      key: { type: GraphQLNonNull(GraphQLString) },
      value: { type: GraphQLNonNull(GraphQLString) },
    },
  },
  getUser: {
    type: UsersType,
    args: {
      key: { type: GraphQLNonNull(GraphQLString) },
      value: { type: GraphQLNonNull(GraphQLString) },
    },
  },
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
      _id: { type: GraphQLNonNull(GraphQLID) },
      user_username: { type: GraphQLString },
      user_password: { type: GraphQLString },
    },
  },
};

module.exports = { query, mutation };
