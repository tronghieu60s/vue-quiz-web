const usersModel = require("@models/usersModel");

const getUser = async (args) =>
  await usersModel.findOne({ [args.key]: args.value }).exec();

const getUsers = async () => await usersModel.find({}).exec();

const createUser = async (args) => new usersModel({ ...args }).save();

const updateUserById = async (args) =>
  await usersModel.findOneAndUpdate(
    { _id: args._id },
    { ...args },
    { new: true }
  );

module.exports = { getUser, getUsers, createUser, updateUserById };
