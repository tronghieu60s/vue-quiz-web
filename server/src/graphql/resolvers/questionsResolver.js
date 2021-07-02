const questionsController = require("../../controllers/questionsController");

module.exports = {
  getQuestionsByQuizId: questionsController.getQuestionsByQuizId,
  createQuestion: questionsController.createQuestion,
  updateQuestionById: questionsController.updateQuestionById,
  deleteQuestionById: questionsController.deleteQuestionById,
};
