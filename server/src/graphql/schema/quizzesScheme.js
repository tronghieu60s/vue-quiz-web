const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const { QuizzesType } = require("@graphql/types");

const query = {
  allQuizzes: { type: GraphQLList(QuizzesType) },
  getQuizzes: {
    type: GraphQLList(QuizzesType),
    args: {
      key: { type: GraphQLNonNull(GraphQLString) },
      value: { type: GraphQLNonNull(GraphQLString) },
    },
  },
  getQuiz: {
    type: QuizzesType,
    args: {
      key: { type: GraphQLNonNull(GraphQLString) },
      value: { type: GraphQLNonNull(GraphQLString) },
    },
  },
};

const mutation = {
  createQuiz: {
    type: QuizzesType,
    args: {
      quiz_title: { type: GraphQLNonNull(GraphQLString) },
      quiz_desc: { type: GraphQLString },
    },
  },
};

module.exports = { query, mutation };
