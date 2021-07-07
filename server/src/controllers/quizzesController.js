const usersModel = require("../models/usersModel");
const quizzesModel = require("../models/quizzesModel");
const questionsModel = require("../models/questionsModel");

const getQuizzesByUserId = async (args) => {
  const getQuiz = await usersModel
    .findById(args.user_id)
    .populate("user_quizzes");
  return getQuiz ? getQuiz.user_quizzes : null;
};

const getQuiz = async (args) => {
  return await quizzesModel.findOne({ [args.key]: args.value }).exec();
};

const getQuizById = async (args) => {
  const { _id } = args;
  const getQuiz = await quizzesModel.findById(_id);
  return getQuiz;
};

const getQuizByQuizCode = async (args) => {
  const { quiz_code } = args;
  const getQuiz = await quizzesModel
    .findOne({ quiz_code })
    .populate("quiz_questions")
    .populate("quiz_players");
  return getQuiz;
};

const createQuiz = async (args) => {
  const { user_id, quiz_title, quiz_desc } = args;

  // create quiz
  const createQuiz = new quizzesModel({ quiz_title, quiz_desc });
  await createQuiz.save();

  // save createQuiz to user
  const getUser = await usersModel.findById(user_id);
  getUser.user_quizzes.push(createQuiz);
  await getUser.save();

  return createQuiz;
};

const updateQuizById = async (args) => {
  return await quizzesModel.findByIdAndUpdate(
    args._id,
    { ...args },
    { new: true }
  );
};

const deleteQuizById = async (args) => {
  const { _id, user_id } = args;
  const deleteQuiz = await quizzesModel.findByIdAndDelete(_id);
  if(deleteQuiz) {
    /* delete all questions reference quiz and
    update quiz to user_quizzes */
    const questions = deleteQuiz.quiz_questions;
    await questionsModel.deleteMany({ _id: { $in: questions } });

    await usersModel.findByIdAndUpdate(user_id, {
      $pullAll: { user_quizzes: [deleteQuiz] },
    });
    return deleteQuiz;
  }

  return null;
};

module.exports = {
  getQuizzesByUserId,
  getQuiz,
  getQuizById,
  getQuizByQuizCode,
  createQuiz,
  updateQuizById,
  deleteQuizById,
};
