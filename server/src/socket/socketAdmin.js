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
    and send stop quiz to all players */
    const { quiz_code } = getQuiz;
    await deleteAllPlayersByQuizCode({ quiz_code });

    socket.emit("server-stop-quiz-success", { quiz: updateQuiz });
    socket.to(quiz_code).emit("server-stop-quiz");
  });

  socket.on("admin-join-quiz", async (args) => {
    const { quiz_code } = args;

    const quizControl = `${quiz_code}-control`;
    socket.join(quizControl);

    // get and send players
    const { quiz_players } = await getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-players", { quiz_players });
  });

  socket.on("admin-kick-player", async (args) => {
    const { quiz_code, player_username } = args;

    await deletePlayerByUsername({ quiz_code, player_username });
    io.to(quiz_code).emit("server-out-room", { player_username });

    const { quiz_players } = await getQuizByQuizCode({ quiz_code });
    socket.emit("server-send-players", { quiz_players });
  });

  socket.on("admin-send-quiz", async (args) => {
    const { quiz_code, quiz_question } = args;

    socket.emit("server-send-quiz", { quiz_question });
    io.to(quiz_code).emit("server-send-quiz", { quiz_question });
  });
}

module.exports = socketAdmin;
