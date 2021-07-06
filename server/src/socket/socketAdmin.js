const playersCon = require("../controllers/playersController");
const quizzesCon = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR ADMIN USERS ---
 *
 **/
function socketAdmin(io, socket) {
  /* --- Admin Join Room --- */
  socket.on("admin-join-room", async (args) => {
    const { quiz_code } = args;

    // admin join room
    const quizControl = `${quiz_code}-control`;
    socket.join(quizControl);

    // get and send players
    const { quiz_players } = await quizzesCon.getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-players", { quiz_players });
  });

  /* --- Admin Kick Player --- */
  socket.on("admin-kick-player", async (args) => {
    const { player_username, quiz_code } = args;
    const player = { quiz_code, player_username };

    // kick and delete user
    await playersCon.deletePlayerByUsername(player);
    io.to(quiz_code).emit("server-kick-player", { player_username });

    // get and send players to admin
    const { quiz_players } = await quizzesCon.getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-players", { quiz_players });
  });

  /* --- Admin Send Quiz --- */
  socket.on("admin-send-quiz", async (args) => {
    const { quiz_code, quiz_question } = args;

    socket.emit("server-send-quiz", { quiz_question });
    io.to(quiz_code).emit("server-send-quiz", { quiz_question });
  });

  /* --- Admin Stop Quiz --- */
  socket.on("admin-stop-quiz", async (args) => {
    const { quiz_code } = args;
    await playersCon.deleteAllPlayersByQuizCode({ quiz_code });
    socket.to(quiz_code).emit("server-stop-quiz");
  });
}

module.exports = socketAdmin;
