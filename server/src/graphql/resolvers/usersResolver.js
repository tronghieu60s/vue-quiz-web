const usersController = require("@controllers/usersController");

module.exports = {
  users: usersController.getUsers,
  createUser: usersController.createUser,
};
