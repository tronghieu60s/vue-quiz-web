const {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");
const { QuestionsType } = require("../types");

const AnswersInput = new GraphQLInputObjectType({
  name: "AnswersInput",
  fields: {
    answer_content: { type: GraphQLString },
    answer_isCorrect: { type: GraphQLBoolean },
  },
});

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
      question_answers: { type: GraphQLNonNull(GraphQLList(AnswersInput)) },
    },
  },
  updateQuestionById: {
    type: QuestionsType,
    args: {
      _id: { type: GraphQLNonNull(GraphQLID) },
      question_content: { type: GraphQLString },
      question_answers: { type: GraphQLList(AnswersInput) },
    },
  },
  deleteQuestionById: {
    type: QuestionsType,
    args: {
      _id: { type: GraphQLNonNull(GraphQLID) },
      quiz_id: { type: GraphQLNonNull(GraphQLID) },
    },
  },
};

module.exports = { query, mutation };
