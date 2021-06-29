const quizzesModel = require("@models/quizzesModel");

const getAllQuizzes = async () => await quizzesModel.find({}).exec();

const getQuizzes = async (args) =>
  await quizzesModel.find({ [args.key]: args.value }).exec();

const getQuiz = async (args) =>
  await quizzesModel.findOne({ [args.key]: args.value }).exec();

const createQuiz = async (args) => new quizzesModel({ ...args }).save();

const updateQuizById = async (args) =>
  await quizzesModel.findByIdAndUpdate(args._id, { ...args }, { new: true });

const deleteQuizById = async (args) =>
  await quizzesModel.findByIdAndDelete(args._id);

module.exports = {
  getAllQuizzes,
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuizById,
  deleteQuizById,
};
