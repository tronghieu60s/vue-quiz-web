const quizzesController = require("@controllers/quizzesController");

module.exports = {
  allQuizzes: quizzesController.getAllQuizzes,
  getQuizzes: usersController.getQuizzes,
  getQuiz: usersController.getQuiz,
  createQuiz: usersController.createQuiz,
};
