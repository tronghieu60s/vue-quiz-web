const usersModel = require("../models/usersModel");
const quizzesModel = require("../models/quizzesModel");

const getQuiz = async (args) =>
  await quizzesModel.findOne({ [args.key]: args.value }).exec();

const getAllQuizzes = async () => await quizzesModel.find({}).exec();

const getQuizzesByUserId = async (args) => {
  const getItem = await usersModel
    .findById(args.user_id)
    .populate("user_quizzes");
  return getItem ? getItem.user_quizzes : null;
};

const createQuiz = async (args) => {
  const { user_id, quiz_title, quiz_desc } = args;

  // create quiz
  const createItem = new quizzesModel({ quiz_title, quiz_desc });
  await createItem.save();

  // save createItem to user
  const getItem = await usersModel.findById(user_id);
  getItem.user_quizzes.push(createItem);
  await getItem.save();

  return createItem;
};

const updateQuizById = async (args) =>
  await quizzesModel.findByIdAndUpdate(args._id, { ...args }, { new: true });

const deleteQuizById = async (args) => {
  const { _id, user_id } = args;
  const deleteItem = await quizzesModel.findByIdAndDelete(_id);
  await usersModel.findByIdAndUpdate(user_id, {
    $pullAll: { user_quizzes: [deleteItem] },
  });
  return deleteItem;
};

module.exports = {
  getQuiz,
  getAllQuizzes,
  getQuizzesByUserId,
  createQuiz,
  updateQuizById,
  deleteQuizById,
};
