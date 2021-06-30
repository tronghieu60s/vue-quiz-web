const usersController = require("../../controllers/usersController");

module.exports = {
  allUsers: usersController.getAllUsers,
  getUsers: usersController.getUsers,
  getUser: usersController.getUser,
  createUser: usersController.createUser,
  updateUserById: usersController.updateUserById,
};
