const usersModel = require("@models/usersModel");

const getAllUsers = async () => await usersModel.find({}).exec();

const getUsers = async (args) =>
  await usersModel.find({ [args.key]: args.value }).exec();

const getUser = async (args) =>
  await usersModel.findOne({ [args.key]: args.value }).exec();

const createUser = async (args) => new usersModel({ ...args }).save();

const updateUserById = async (args) =>
  await usersModel.findByIdAndUpdate(args._id, { ...args }, { new: true });

module.exports = { getAllUsers, getUsers, getUser, createUser, updateUserById };
