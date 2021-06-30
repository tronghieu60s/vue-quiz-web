const {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { QuizzesType } = require("../types");

const query = {
  getQuizzesByUser: {
    type: GraphQLList(QuizzesType),
    args: { user_id: { type: GraphQLNonNull(GraphQLID) } },
  },
};

const mutation = {
  createQuiz: {
    type: QuizzesType,
    args: {
      user_id: { type: GraphQLNonNull(GraphQLID) },
      quiz_title: { type: GraphQLNonNull(GraphQLString) },
      quiz_desc: { type: GraphQLString },
    },
  },
};

module.exports = { query, mutation };
