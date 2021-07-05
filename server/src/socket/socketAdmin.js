const playersCon = require("../controllers/playersController");
const quizzesCon = require("../controllers/quizzesController");

/**
 *
 *--- SOCKET FOR ADMIN USERS ---
 *
 **/
function socketAdmin(socket) {
  // /* --- Admin Join Room --- */
  // socket.on("admin-join-control", async (args) => {
  //   const { quiz_code } = args;

  //   // admin join room
  //   const quizControl = `${quiz_code}-control`;
  //   socket.join(quizControl);

  //   // get and send players
  //   const quiz = { key: "quiz_code", value: quiz_code };
  //   const getQuiz = await quizzesCon.getQuiz(quiz);
  //   socket.emit("server-send-players", { quiz_players: getQuiz.quiz_players });
  // });

  // socket.on("admin-kick-player", async (args) => {
  //   const { player_username, quiz_code } = args;
  //   const player = { quiz_code, player_username };

  //   // delete user from database
  //   await playersCon.deletePlayerByUsername(player);

  //   // get and send players
  //   const getQuiz = await quizzesCon.getQuiz({
  //     key: "quiz_code",
  //     value: quiz_code,
  //   });
  //   socket.emit("server-send-users", getQuiz.quiz_players);
  //   io.to(quiz_code).emit("server-user-kick", { username });
  // });

  // socket.on("admin-kick-user", ({ username, quiz_code }) => {
  //   if (!users[quiz_code]) return;

  //   delete users[quiz_code][username];
  //   socket.emit("server-user-kick", username);
  //   socket.emit("server-send-users", users[quiz_code]);
  //   io.to(quiz_code).emit("server-user-kick", username);
  // });

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

  // socket.on("admin-stop-quiz", (quiz_code) => {
  //   if (!users[quiz_code]) return;

  //   delete quiz[quiz_code];
  //   delete users[quiz_code];

  //   socket.to(quiz_code).emit("server-stop-quiz");
  // });
}

module.exports = socketAdmin;
