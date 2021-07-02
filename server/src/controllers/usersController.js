const usersModel = require("../models/usersModel");

const getAllUsers = async () => await usersModel.find({}).exec();

const getUsers = async (args) =>
  await usersModel.find({ [args.key]: args.value }).exec();

const getUser = async (args) =>
  await usersModel.findOne({ [args.key]: args.value }).exec();

const createUser = async (args) => {
  const { user_username, user_password } = args;
  const createItem = new usersModel({ user_username, user_password }).save();
  return createItem;
};

const updateUserById = async (args) => {
  const { _id, user_username, user_password } = args;
  return await usersModel.findByIdAndUpdate(
    _id,
    { user_username, user_password },
    { new: true }
  );
};
module.exports = { getAllUsers, getUsers, getUser, createUser, updateUserById };
