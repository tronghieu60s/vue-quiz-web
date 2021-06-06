const socketConnect = (io) => {
  const users = {};
  const quiz = {};
  io.on("connection", (socket) => {
    // socket admin user
    socket.on("admin-join-control", (quiz_code) => {
      // setup quiz
      if (!quiz[quiz_code]) quiz[quiz_code] = {};
      if (!users[quiz_code]) users[quiz_code] = {};

      socket.join(quiz_code + "-control");
      socket.emit("server-send-users", users[quiz_code]);
    });

    socket.on("admin-kick-user", ({ username, quiz_code }) => {
      if (!users[quiz_code]) return;

      delete users[quiz_code][username];
      socket.emit("server-user-kick", username);
      socket.emit("server-send-users", users[quiz_code]);
      io.to(quiz_code).emit("server-user-kick", username);
    });

    socket.on("admin-send-question", ({ quiz_code, question }) => {
      if (!users[quiz_code]) return;

      quiz[quiz_code]["question"] = question;
      const showResult = (quiz[quiz_code]["show-result"] = false);
      socket.emit("server-show-result", showResult);
      io.to(quiz_code).emit("server-show-result", showResult);

      socket.emit("server-send-question", question);
      io.to(quiz_code).emit("server-send-question", question);
    });

    socket.on("admin-show-result", (quiz_code) => {
      if (!users[quiz_code]) return;

      const showResult = (quiz[quiz_code]["show-result"] = true);
      socket.emit("server-show-result", showResult);
      io.to(quiz_code).emit("server-show-result", showResult);
    });

    socket.on("admin-stop-quiz", (quiz_code) => {
      if (!users[quiz_code]) return;

      delete quiz[quiz_code];
      delete users[quiz_code];

      socket.to(quiz_code).emit("server-stop-quiz");
    });

    // socket normal user
    socket.on("client-register-user", ({ username, quiz_code }) => {
      if (users[quiz_code][username])
        return socket.emit("server-username-exists");
      socket.emit("server-register-user-success", username);
    });

    socket.on("client-join-user", ({ username, quiz_code }) => {
      if (!users[quiz_code]) return;

      // user join room quiz_code
      socket.join(quiz_code);
      users[quiz_code][username] = "online";

      // send question
      socket.emit("server-send-question", quiz[quiz_code]["question"]);
      socket.emit("server-show-result", quiz[quiz_code]["show-result"]);

      // client connected send to control
      socket.emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-send-users", users[quiz_code]);

      // listener user disconnect
      socket.on("disconnect", () => {
        if (!users[quiz_code]) return;

        users[quiz_code][username] = "offline";
        io.to(quiz_code + "-control").emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit(
          "server-send-users",
          users[quiz_code]
        );
      });
    });

    socket.on("client-out-user", ({ username, quiz_code }) => {
      if (!users[quiz_code]) return;

      delete users[quiz_code][username];
      socket.emit("server-user-disconnect", username);
      io.to(quiz_code + "-control").emit("server-user-disconnect", username);
      io.to(quiz_code + "-control").emit("server-send-users", users[quiz_code]);
    });
  });
};

module.exports = socketConnect;
