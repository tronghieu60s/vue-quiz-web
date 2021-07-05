const playersCon = require("../controllers/playersController");
const quizzesCon = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR ADMIN USERS ---
 *
 **/
function socketAdmin(io, socket) {
  /* --- Admin Join Room --- */
  socket.on("admin-join-control", async (args) => {
    const { quiz_code } = args;

    // admin join room
    const quizControl = `${quiz_code}-control`;
    socket.join(quizControl);

    // get and send players
    const { quiz_players } = await quizzesCon.getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-players", { quiz_players });
  });

  socket.on("admin-kick-player", async (args) => {
    const { player_username, quiz_code } = args;
    const player = { quiz_code, player_username };

    // kick and delete user
    await playersCon.deletePlayerByUsername(player);
    io.to(quiz_code).emit("server-user-kick", { player_username });

    // get and send players to admin
    const { quiz_players } = await quizzesCon.getQuizByQuizCode({ quiz_code });
    console.log(quiz_players);
    socket.emit("server-send-players", { quiz_players });
  });

  socket.on("admin-stop-quiz", async (args) => {
    const { quiz_code } = args;
    await playersCon.deletePlayersByQuizCode({ quiz_code });
    socket.to(quiz_code).emit("server-stop-quiz");
  });

  // socket.on("admin-send-question", ({ quiz_code, question }) => {
  //   if (!users[quiz_code]) return;

  //   quiz[quiz_code]["question"] = question;
  //   const showResult = (quiz[quiz_code]["show-result"] = false);
  //   socket.emit("server-show-result", showResult);
  //   io.to(quiz_code).emit("server-show-result", showResult);

  //   socket.emit("server-send-question", question);
  //   io.to(quiz_code).emit("server-send-question", question);
  // });

  // socket.on("admin-show-result", (quiz_code) => {
  //   if (!users[quiz_code]) return;

  //   const showResult = (quiz[quiz_code]["show-result"] = true);
  //   socket.emit("server-show-result", showResult);
  //   io.to(quiz_code).emit("server-show-result", showResult);
  // });
}

module.exports = socketAdmin;
