const usersModel = require("../models/usersModel");
const quizzesModel = require("../models/quizzesModel");

const getQuizzesByUser = async (args) => {
  const { user_id } = args;
  const getUser = await usersModel.findById(user_id).populate("user_quizzes");
  return getUser.user_quizzes;
};

const createQuiz = async (args) => {
  const { user_id, quiz_title, quiz_desc } = args;

  // create quiz
  const quizCreated = new quizzesModel({ quiz_title, quiz_desc });
  await quizCreated.save();

  // save quizCreated to user
  const getUser = await usersModel.findById(user_id);
  getUser.user_quizzes.push(quizCreated);
  await getUser.save();

  return quizCreated;
};

const updateQuizById = async (args) =>
  await quizzesModel.findByIdAndUpdate(args._id, { ...args }, { new: true });

const deleteQuizById = async (args) =>
  await quizzesModel.findByIdAndDelete(args._id);

module.exports = {
  getQuizzesByUser,
  createQuiz,
  updateQuizById,
  deleteQuizById,
};
