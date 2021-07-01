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
};

module.exports = { query, mutation };
