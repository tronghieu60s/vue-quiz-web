const usersResolver = require("./usersResolver");
const quizzesResolver = require("./quizzesResolver");
const questionsResolver = require("./questionsResolver");

const rootResolvers = {
  ...usersResolver,
  ...quizzesResolver,
  ...questionsResolver,
};

module.exports = rootResolvers;
