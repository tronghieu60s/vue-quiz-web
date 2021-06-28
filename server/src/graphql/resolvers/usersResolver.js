const usersController = require("@controllers/usersController");

module.exports = {
  user: usersController.getUser,
  users: usersController.getUsers,
  createUser: usersController.createUser,
  updateUserById: usersController.updateUserById,
};
