const quizzesModel = require("../models/quizzesModel");
const questionsModel = require("../models/questionsModel");

const getQuestionsByQuizId = async (args) => {
  const getItem = await quizzesModel
    .findById(args.quiz_id)
    .populate("quiz_questions");
  return getItem ? getItem.quiz_questions : null;
};

const createQuestion = async (args) => {
  const { quiz_id, question_content, question_answers } = args;

  // create question
  const createItem = new questionsModel({ question_content, question_answers });
  await createItem.save();

  // save createItem to quiz
  const getItem = await quizzesModel.findById(quiz_id);
  getItem.quiz_questions.push(createItem);
  await getItem.save();

  return createItem;
};

const deleteQuestionById = async (args) => {
  const { _id, quiz_id } = args;
  const deleteItem = await questionsModel.findByIdAndDelete(_id);
  await quizzesModel.findByIdAndUpdate(quiz_id, {
    $pullAll: { quiz_questions: [deleteItem] },
  });
  return deleteItem;
};

module.exports = { getQuestionsByQuizId, createQuestion, deleteQuestionById };
