const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const UsersType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    _id: { type: GraphQLID },
    user_username: { type: GraphQLString },
    user_password: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

const QuizzesType = new GraphQLObjectType({
  name: "Quizzes",
  fields: () => ({
    _id: { type: GraphQLID },
    quiz_title: { type: GraphQLString },
    quiz_desc: { type: GraphQLString },
    quiz_code: { type: GraphQLString },
    quiz_current: { type: GraphQLInt },
    quiz_user: { type: UsersType },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = { UsersType, QuizzesType };
