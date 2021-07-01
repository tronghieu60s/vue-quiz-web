const quizzesController = require("../../controllers/quizzesController");

module.exports = {
  getAllQuizzes: quizzesController.getAllQuizzes,
  getQuizzesByUserId: quizzesController.getQuizzesByUserId,
  createQuiz: quizzesController.createQuiz,
  updateQuizById: quizzesController.updateQuizById,
  deleteQuizById: quizzesController.deleteQuizById,
};
