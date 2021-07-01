const {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { QuestionsType, AnswersType } = require("../types");

const query = {
  getQuestionsByQuizId: {
    type: GraphQLList(QuestionsType),
    args: { quiz_id: { type: GraphQLNonNull(GraphQLID) } },
  },
};

const mutation = {
  createQuestion: {
    type: QuestionsType,
    args: {
      quiz_id: { type: GraphQLNonNull(GraphQLID) },
      question_content: { type: GraphQLNonNull(GraphQLString) },
      question_answers: { type: GraphQLNonNull(GraphQLList(AnswersType)) },
    },
  },
};

module.exports = { query, mutation };
