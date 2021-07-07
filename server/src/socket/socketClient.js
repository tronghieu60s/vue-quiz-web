const {
  getPlayerByUsername,
  createPlayer,
  updatePlayerByUsername,
  deletePlayerByUsername,
} = require("../controllers/playersController");
const { getQuizByQuizCode } = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR NORMAL PLAYERS ---
 *
 **/

async function serverSendPlayersByQuizCode(io, quiz_code) {
  const getQuiz = await getQuizByQuizCode({ quiz_code });
  if (getQuiz) {
    const quizControl = `${quiz_code}-control`;
    io.to(quizControl).emit("server-send-players", {
      quiz_players: getQuiz.quiz_players,
    });
  }
}

function socketClient(io, socket) {
  socket.on("client-username-register", async (args) => {
    const { quiz_code, player_username } = args;

    const getPlayer = await getPlayerByUsername({ quiz_code, player_username });
    if (getPlayer) {
      return socket.emit("server-username-exists");
    }

    return socket.emit("server-username-not-exists");
  });

  socket.on("client-join-room", async (args) => {
    const { quiz_code, player_username } = args;

    socket.join(quiz_code);

    /* get player by username if user not exist then create new player
    if user is offline to set player online
    then send all players to admin */
    const player = { quiz_code, player_socket: socket.id, player_username };
    const getPlayer = await getPlayerByUsername(player);
    if (!getPlayer) {
      await createPlayer(player);
    } else if (!getPlayer.player_online) {
      await updatePlayerByUsername({ ...player, player_online: true });
    }
    serverSendPlayersByQuizCode(io, quiz_code);

    /* this is function for user disconnect from server */
    socket.on("disconnect", async () => {
      /* set player to offline if user disconnect from server
      get players and resend to admin for update current players */
      await updatePlayerByUsername({ ...player, player_online: false });
      serverSendPlayersByQuizCode(io, quiz_code);
    });
  });

  socket.on("client-out-room", async (args) => {
    const { quiz_code, player_username } = args;

    const getQuiz = await getQuizByQuizCode({ quiz_code });
    if (!getQuiz) return;

    /* player request disconnect, server delete user from database
    and send status disconnect to player */
    await deletePlayerByUsername({ quiz_code, player_username });
    socket.emit("server-out-room");
    serverSendPlayersByQuizCode(io, quiz_code);
  });
}

module.exports = socketClient;
