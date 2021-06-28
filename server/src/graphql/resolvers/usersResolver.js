const usersController = require("@controllers/usersController");

module.exports = {
  allUsers: usersController.getAllUsers,
  users: usersController.getUsers,
  user: usersController.getUser,
  createUser: usersController.createUser,
  updateUserById: usersController.updateUserById,
};
