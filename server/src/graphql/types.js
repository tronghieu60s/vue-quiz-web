const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const UsersType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    _id: { type: GraphQLID },
    user_username: { type: GraphQLString },
    user_password: { type: GraphQLString },
    user_quizzes: { type: GraphQLList(QuizzesType) },
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
    quiz_questions: { type: GraphQLList(QuestionsType) },
    quiz_players: { type: GraphQLList(PlayersType) },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

const AnswersType = new GraphQLObjectType({
  name: "Answers",
  fields: () => ({
    answer_content: { type: GraphQLString },
    answer_isCorrect: { type: GraphQLBoolean },
  }),
});

const QuestionsType = new GraphQLObjectType({
  name: "Questions",
  fields: () => ({
    _id: { type: GraphQLID },
    question_content: { type: GraphQLString },
    question_answers: { type: GraphQLList(AnswersType) },
    question_scores: { type: GraphQLInt },
    question_times: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

const PlayersType = new GraphQLObjectType({
  name: "Players",
  fields: () => ({
    _id: { type: GraphQLID },
    player_socket: { type: GraphQLString },
    player_username: { type: GraphQLString },
    player_online: { type: GraphQLBoolean },
    player_scores: { type: GraphQLInt },
    player_quiz: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = {
  UsersType,
  QuizzesType,
  QuestionsType,
  AnswersType,
  PlayersType,
};
