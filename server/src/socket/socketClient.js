const playersCon = require("../controllers/playersController");
const quizzesCon = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR NORMAL PLAYERS ---
 *
 **/

function socketClient(io, socket) {
  /* --- Player Register --- */
  socket.on("client-register-room", async (args) => {
    const { quiz_code, player_username } = args;
    const player = { quiz_code, player_username };

    // get quiz and check username exists
    const getPlayer = await playersCon.getPlayersByUsername(player);
    if (getPlayer) {
      return socket.emit("server-username-exists");
    }

    // if player not exist
    return socket.emit("server-username-not-exists");
  });

  /* --- Player Join Room --- */
  socket.on("client-join-room", async (args) => {
    const { quiz_code, player_username } = args;
    const player = { quiz_code, player_username };

    // player join room
    socket.join(quiz_code);

    // get player and set online status
    const getPlayer = await playersCon.getPlayersByUsername(player);
    if (!getPlayer) {
      await playersCon.createPlayer(player);
    } else if (!getPlayer.player_online) {
      await playersCon.updatePlayerByUsername({
        ...player,
        player_online: true,
      });
    }

    // send question and status result to client
    const { quiz_questions, quiz_result, quiz_players } =
      await quizzesCon.getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-question", { quiz_questions });
    socket.emit("server-send-result", { quiz_result });

    // send players to admin
    const quizControl = `${quiz_code}-control`;
    io.to(quizControl).emit("server-send-players", { quiz_players });

    /* --- SOCKET PLAYER DISCONNECT */
    socket.on("disconnect", async () => {
      // set player offline
      await playersCon.updatePlayerByUsername({
        ...player,
        player_online: false,
      });

      // send players to admin
      const { quiz_players } = await quizzesCon.getQuizByQuizCode({
        quiz_code,
      });
      const quizControl = `${quiz_code}-control`;
      io.to(quizControl).emit("server-send-players", { quiz_players });
    });
  });

  /* --- Player Out Of Room --- */
  socket.on("client-out-room", async (args) => {
    const { quiz_code, player_username } = args;
    const player = { quiz_code, player_username };

    // check quiz exists
    const getQuiz = await quizzesCon.getQuizByQuizCode({ quiz_code });
    if (!getQuiz) return;

    // delete player from database
    await playersCon.deletePlayerByUsername(player);
    socket.emit("server-player-disconnect", { player_username });

    // send players to admin
    const { quiz_players } = await quizzesCon.getQuizByQuizCode({ quiz_code });
    const quizControl = `${quiz_code}-control`;
    io.to(quizControl).emit("server-send-players", { quiz_players });
  });
}

module.exports = socketClient;
