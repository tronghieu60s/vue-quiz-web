const quizzesController = require("../../controllers/quizzesController");

module.exports = {
  getQuizzesByUserId: quizzesController.getQuizzesByUserId,
  getQuiz: quizzesController.getQuiz,
  createQuiz: quizzesController.createQuiz,
  updateQuizById: quizzesController.updateQuizById,
  deleteQuizById: quizzesController.deleteQuizById,
};
