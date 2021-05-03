const socketConnect = (io) => {
  const users = {};
  io.on("connection", (socket) => {
    socket.on("client-join-control", (quiz_code) => {
      if (!users[quiz_code]) users[quiz_code] = [];
      socket.join(quiz_code + "-control");
      socket.emit("server-send-users", users[quiz_code]);
    });

    socket.on("client-join-user", (props) => {
      const { username, quiz_code } = props;

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
        if (findUser !== -1) {
          users[quiz_code].splice(findUser, 1);
          io.to(quiz_code + "-control").emit(
            "server-user-disconnect",
            username
          );
          io.to(quiz_code + "-control").emit(
            "server-send-users",
            users[quiz_code]
          );
        }
      });
    });

    socket.on("client-kick-user", (props) => {
      const { username, quiz_code } = props;
      const findUser = users[quiz_code].findIndex((o) => o === username);
      if (findUser !== -1) {
        users[quiz_code].splice(findUser, 1);

        io.to(quiz_code).emit("server-user-kick", username);
        io.to(quiz_code + "-control").emit("server-user-kick", username);
        io.to(quiz_code + "-control").emit(
          "server-send-users",
          users[quiz_code]
        );
      }
    });

    socket.on("client-out-user", (props) => {
      const { username, quiz_code } = props;
      const findUser = users[quiz_code].findIndex((o) => o === username);
      if (findUser !== -1) {
        users[quiz_code].splice(findUser, 1);

        io.to(quiz_code).emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit(
          "server-send-users",
          users[quiz_code]
        );
      }
    });
  });
};

module.exports = socketConnect;
