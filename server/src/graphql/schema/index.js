const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const usersSchema = require("./usersSchema");
const quizzesSchema = require("./quizzesSchema");
const questionsSchema = require("./questionsSchema");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...usersSchema.query,
    ...quizzesSchema.query,
    ...questionsSchema.query,
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...usersSchema.mutation,
    ...quizzesSchema.mutation,
    ...questionsSchema.mutation,
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
