const questionsController = require("../../controllers/questionsController");

module.exports = {
  getQuestionsByQuizId: questionsController.getQuestionsByQuizId,
  createQuestion: questionsController.createQuestion,
  deleteQuestionById: questionsController.deleteQuestionById,
};
