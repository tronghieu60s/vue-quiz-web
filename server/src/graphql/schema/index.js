const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const usersSchema = require("./usersSchema");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({ ...usersSchema.query }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({ ...usersSchema.mutation }),
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
