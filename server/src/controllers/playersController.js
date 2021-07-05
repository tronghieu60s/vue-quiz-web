const playersModel = require("../models/playersModel");
const quizzesModel = require("../models/quizzesModel");

const getPlayersByUsername = async (args) => {
  const { quiz_code, player_username } = args;
  return await playersModel.findOne({
    player_username,
    player_quiz: quiz_code,
  });
};

const createPlayer = async (args) => {
  const { quiz_code, player_username } = args;

  // create quiz
  const createPlayer = new playersModel({
    player_username,
    player_quiz: quiz_code,
  });
  await createPlayer.save();

  // save createItem to user
  const getQuiz = await quizzesModel.findOne({ quiz_code });
  getQuiz.quiz_players.push(createPlayer);
  await getQuiz.save();

  return createPlayer;
};

const updatePlayerByUsername = async (args) => {
  const { quiz_code, player_username } = args;
  return await playersModel.findOneAndUpdate(
    { player_username, player_quiz: quiz_code },
    { ...args },
    { new: true }
  );
};

const deletePlayerByUsername = async (args) => {
  const { quiz_code, player_username } = args;
  const deletePlayer = await playersModel.findOneAndDelete({
    player_username,
    player_quiz: quiz_code,
  });
  await quizzesModel.findOneAndUpdate(
    { quiz_code },
    {
      $pullAll: { quiz_players: [deletePlayer] },
    }
  );
  return deletePlayer;
};

const deletePlayersByQuizCode = async (args) => {
  const { quiz_code } = args;
  const deletePlayers = await playersModel.deleteMany({
    player_quiz: quiz_code,
  });
  return deletePlayers;
};

module.exports = {
  getPlayersByUsername,
  createPlayer,
  updatePlayerByUsername,
  deletePlayerByUsername,
  deletePlayersByQuizCode,
};
