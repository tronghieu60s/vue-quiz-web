const usersModel = require("../models/usersModel");
const quizzesModel = require("../models/quizzesModel");

const getAllQuizzes = async () => {
  return await quizzesModel.find({}).exec();
};

const getQuizzesByUserId = async (args) => {
  const getQuiz = await usersModel
    .findById(args.user_id)
    .populate("user_quizzes");
  return getQuiz ? getQuiz.user_quizzes : null;
};

const getQuiz = async (args) => {
  return await quizzesModel.findOne({ [args.key]: args.value }).exec();
};

const getQuizReferenceByQuizCode = async (args) => {
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

const updateQuizById = async (args) =>
  await quizzesModel.findByIdAndUpdate(args._id, { ...args }, { new: true });

const deleteQuizById = async (args) => {
  const { _id, user_id } = args;
  const deleteQuiz = await quizzesModel.findByIdAndDelete(_id);
  await usersModel.findByIdAndUpdate(user_id, {
    $pullAll: { user_quizzes: [deleteQuiz] },
  });
  return deleteQuiz;
};

module.exports = {
  getAllQuizzes,
  getQuizzesByUserId,
  getQuiz,
  getQuizReferenceByQuizCode,
  createQuiz,
  updateQuizById,
  deleteQuizById,
};
