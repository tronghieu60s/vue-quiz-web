const {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const { QuizzesType } = require("../types");

const query = {
  getQuizzesByUserId: {
    type: GraphQLList(QuizzesType),
    args: { user_id: { type: GraphQLNonNull(GraphQLID) } },
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
      user_id: { type: GraphQLNonNull(GraphQLID) },
      quiz_title: { type: GraphQLNonNull(GraphQLString) },
      quiz_desc: { type: GraphQLString },
    },
  },
  updateQuizById: {
    type: QuizzesType,
    args: {
      _id: { type: GraphQLNonNull(GraphQLID) },
      quiz_title: { type: GraphQLString },
      quiz_desc: { type: GraphQLString },
      quiz_code: { type: GraphQLString },
      quiz_current: { type: GraphQLInt },
    },
  },
  deleteQuizById: {
    type: QuizzesType,
    args: {
      _id: { type: GraphQLNonNull(GraphQLID) },
      user_id: { type: GraphQLNonNull(GraphQLID) },
    },
  },
};

module.exports = { query, mutation };
