const {
  deleteAllPlayersByQuizCode,
  deletePlayerByUsername,
} = require("../controllers/playersController");
const {
  getQuizById,
  getQuizByQuizCode,
  updateQuizById,
} = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR ADMIN USERS ---
 *
 **/

async function serverSendPlayersByQuizCode(socket, quiz_code) {
  const getQuiz = await getQuizByQuizCode({ quiz_code });
  if (getQuiz) {
    socket.emit("server-send-players", { quiz_players: getQuiz.quiz_players });
  }
}

async function generateCodeQuiz() {
  const rdQuizCode = Math.random().toString(36).substring(7);
  const getQuiz = await getQuizByQuizCode({ quiz_code: rdQuizCode });
  if (getQuiz) {
    return this.generateCodeQuiz();
  }

  return rdQuizCode;
}

function socketAdmin(io, socket) {
  socket.on("admin-start-quiz", async (args) => {
    const { quiz_id } = args;

    const quiz_code = await generateCodeQuiz();
    const updateQuiz = await updateQuizById({ _id: quiz_id, quiz_code });
    if (!updateQuiz) {
      return socket.emit("server-start-quiz-failed");
    }

    return socket.emit("server-start-quiz-success", { quiz: updateQuiz });
  });

  socket.on("admin-stop-quiz", async (args) => {
    const { quiz_id } = args;

    /* get and update quiz code = null */
    const getQuiz = await getQuizById({ _id: quiz_id });
    if (!getQuiz) {
      return socket.emit("server-stop-quiz-failed");
    }
    const updateQuiz = await updateQuizById({
      _id: quiz_id,
      quiz_code: null,
      quiz_current: 0,
      quiz_players: [],
    });
    if (!updateQuiz) {
      return socket.emit("server-stop-quiz-failed");
    }

    /* delete all players by quiz code
    and send out room to all players */
    const { quiz_code } = getQuiz;
    await deleteAllPlayersByQuizCode({ quiz_code });

    socket.emit("server-stop-quiz-success", { quiz: updateQuiz });
    socket.to(quiz_code).emit("server-out-room");
  });

  socket.on("admin-join-quiz", async (args) => {
    const { quiz_code } = args;
    socket.join(`${quiz_code}-control`);
    serverSendPlayersByQuizCode(socket, quiz_code);
  });

  socket.on("admin-kick-player", async (args) => {
    const { quiz_code, player_username } = args;

    /* delete player from database and get value socket
    for send to player logout, send all players to admin */
    const deletePlayer = await deletePlayerByUsername({
      quiz_code,
      player_username,
    });
    if (deletePlayer) {
      io.to(deletePlayer.player_socket).emit("server-out-room");
      serverSendPlayersByQuizCode(socket, quiz_code);
    }
  });

  socket.on("admin-send-question", async (args) => {
    const { quiz_code, quiz_question } = args;

    socket.emit("server-send-question", { quiz_question });
    io.to(quiz_code).emit("server-send-question", { quiz_question });
  });

  socket.on("admin-send-result", async (args) => {
    const { quiz_code, quiz_result } = args;

    socket.emit("server-send-result", { quiz_result });
    io.to(quiz_code).emit("server-send-result", { quiz_result });
  });

  socket.on("admin-send-ranking", async (args) => {
    const { quiz_code } = args;

    // socket.emit("server-send-question", { quiz_result });
    // io.to(quiz_code).emit("server-send-question", { quiz_result });
  });
}

module.exports = socketAdmin;
