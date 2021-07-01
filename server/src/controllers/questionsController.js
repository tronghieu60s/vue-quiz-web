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
  const createItem = new questionsModel({
    question_content,
    question_answers,
  });
  await createItem.save();

  // save createItem to quiz
  const getItem = await quizzesModel.findById(quiz_id);
  getItem.quiz_questions.push(createItem);
  await getItem.save();

  return createItem;
};

module.exports = { getQuestionsByQuizId, createQuestion };
