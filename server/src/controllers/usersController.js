const usersModel = require("@models/usersModel");

const getUsers = async () => await usersModel.find({}).exec();

const createUser = async (args) => {
  const { user_username, user_password } = args;
  const newUser = new usersModel({ user_username, user_password });
  return newUser.save();
};

module.exports = { getUsers, createUser };
