const quizzesController = require("../../controllers/quizzesController");

module.exports = {
  getQuizzesByUser: quizzesController.getQuizzesByUser,
  createQuiz: quizzesController.createQuiz,
};
