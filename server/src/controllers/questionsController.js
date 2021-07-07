const quizzesModel = require("../models/quizzesModel");
const questionsModel = require("../models/questionsModel");

const getQuestionsByQuizId = async (args) => {
  const getQuestion = await quizzesModel
    .findById(args.quiz_id)
    .populate("quiz_questions");
  return getQuestion ? getQuestion.quiz_questions : null;
};

const getQuestionsByQuizCode = async (args) => {
  const getQuiz = await quizzesModel
    .findOne({ quiz_code: args.quiz_code })
    .populate("quiz_questions");
  return getQuiz ? getQuiz.quiz_questions : null;
};

const createQuestion = async (args) => {
  const {
    quiz_id,
    question_content,
    question_answers,
    question_scores,
    question_times,
  } = args;

  // create question
  const createQuestion = new questionsModel({
    question_content,
    question_answers,
  });
  await createQuestion.save();

  // save createQuestion to quiz
  const getQuiz = await quizzesModel.findById(quiz_id);
  getQuiz.quiz_questions.push(createQuestion);
  await getQuiz.save();

  return createQuestion;
};

const updateQuestionById = async (args) => {
  return await questionsModel.findByIdAndUpdate(
    args._id,
    { ...args },
    { new: true }
  );
};

const deleteQuestionById = async (args) => {
  const { _id, quiz_id } = args;
  const deleteQuestion = await questionsModel.findByIdAndDelete(_id);
  await quizzesModel.findByIdAndUpdate(quiz_id, {
    $pullAll: { quiz_questions: [deleteQuestion] },
  });
  return deleteQuestion;
};

module.exports = {
  getQuestionsByQuizId,
  getQuestionsByQuizCode,
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
};
