const usersController = require("../../controllers/usersController");

module.exports = {
  getUsers: usersController.getUsers,
  getUser: usersController.getUser,
  createUser: usersController.createUser,
  updateUserById: usersController.updateUserById,
};
