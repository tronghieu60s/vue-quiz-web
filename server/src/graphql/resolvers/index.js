const usersResolver = require("./usersResolver");
const quizzesResolver = require("./quizzesResolver");

const rootResolvers = { ...usersResolver, ...quizzesResolver };

module.exports = rootResolvers;
