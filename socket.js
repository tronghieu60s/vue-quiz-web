const socketConnect = (io) => {
  const users = {};
  const quiz = {};
  io.on("connection", (socket) => {
    // socket admin user
    socket.on("admin-join-control", (quiz_code) => {
      // setup quiz
      if (!quiz[quiz_code]) quiz[quiz_code] = {};
      if (!users[quiz_code]) users[quiz_code] = [];

      socket.join(quiz_code + "-control");
      socket.emit("server-send-users", users[quiz_code]);
    });

    socket.on("admin-kick-user", ({ username, quiz_code }) => {
      const findUser = users[quiz_code].findIndex((o) => o === username);
      if (findUser === -1) return;
      users[quiz_code].splice(findUser, 1);

      socket.emit("server-user-kick", username);
      socket.emit("server-send-users", users[quiz_code]);
      io.to(quiz_code).emit("server-user-kick", username);
    });

    socket.on("admin-send-question", ({ quiz_code, question }) => {
      const showAnswer = (quiz[quiz_code]["show-answer"] = false);
      socket.emit("server-show-answer", showAnswer);
      io.to(quiz_code).emit("server-show-answer", showAnswer);

      socket.emit("server-send-question", question);
      io.to(quiz_code).emit("server-send-question", question);
    });

    socket.on("admin-show-answer", (quiz_code) => {
      const showAnswer = (quiz[quiz_code]["show-answer"] = true);
      socket.emit("server-show-answer", showAnswer);
      io.to(quiz_code).emit("server-show-answer", showAnswer);
    });

    // socket normal user
    socket.on("client-join-user", ({ username, quiz_code }) => {
      if (!users[quiz_code]) users[quiz_code] = [];
      const findUser = users[quiz_code].findIndex((o) => o === username);
      if (findUser !== -1) return socket.emit("server-username-exists");

      // user join room quiz_code
      socket.join(quiz_code);
      users[quiz_code].push(username);

      // client connected send to control
      socket.emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-send-users", users[quiz_code]);

      // listener user disconnect
      socket.on("disconnect", () => {
        const findUser = users[quiz_code].findIndex((o) => o === username);
        if (findUser === -1) return;
        users[quiz_code].splice(findUser, 1);

        io.to(quiz_code + "-control").emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit(
          "server-send-users",
          users[quiz_code]
        );
      });
    });

    socket.on("client-out-user", (props) => {
      const { username, quiz_code } = props;
      const findUser = users[quiz_code].findIndex((o) => o === username);
      if (findUser === -1) return;
      users[quiz_code].splice(findUser, 1);

      socket.emit("server-user-disconnect", username);
      io.to(quiz_code + "-control").emit("server-user-disconnect", username);
      io.to(quiz_code + "-control").emit("server-send-users", users[quiz_code]);
    });
  });
};

module.exports = socketConnect;
