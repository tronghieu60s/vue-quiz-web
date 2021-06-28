const usersModel = require("../models/usersModel");

async function getUsers() {
  const users = await usersModel.find({}).exec();
  console.log(users);
}

module.exports = { getUsers };
