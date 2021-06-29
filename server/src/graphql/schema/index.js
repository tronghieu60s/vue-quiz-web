const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const usersSchema = require("./usersSchema");
const quizzesScheme = require("./quizzesScheme");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({ ...usersSchema.query, ...quizzesScheme.query }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({ ...usersSchema.mutation, ...quizzesScheme.mutation }),
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
