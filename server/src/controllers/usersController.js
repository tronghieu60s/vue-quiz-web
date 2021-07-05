const usersModel = require("../models/usersModel");

const getAllUsers = async () => {
  return await usersModel.find({}).exec();
};

const getUsers = async (args) => {
  return await usersModel.find({ [args.key]: args.value }).exec();
};

const getUser = async (args) => {
  return await usersModel.findOne({ [args.key]: args.value }).exec();
};

const createUser = async (args) => {
  const { user_username, user_password } = args;
  const createUser = new usersModel({ user_username, user_password }).save();
  return createUser;
};

const updateUserById = async (args) => {
  return await usersModel.findByIdAndUpdate(
    args._id,
    { ...args },
    { new: true }
  );
};

module.exports = { getAllUsers, getUsers, getUser, createUser, updateUserById };
