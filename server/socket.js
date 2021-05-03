const socketConnect = (io) => {
  const users = [];
  io.on("connection", (socket) => {
    socket.on("client-join-control", (quiz_code) => {
      socket.join(quiz_code + "-control");
      socket.emit("server-send-users", users);
    });

    socket.on("client-join-user", (props) => {
      const { username, quiz_code } = props;

      // user join room quiz_code
      socket.join(quiz_code);
      users.push(username);

      // client connected send to control
      socket.emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-user-connected", username);
      io.to(quiz_code + "-control").emit("server-send-users", users);

      // listener user disconnect
      socket.on("disconnect", () => {
        const findUser = users.findIndex((o) => o === username);
        if (findUser !== -1) {
          users.splice(findUser, 1);
          io.to(quiz_code + "-control").emit(
            "server-user-disconnect",
            username
          );
          io.to(quiz_code + "-control").emit("server-send-users", users);
        }
      });
    });

    socket.on("client-kick-user", (props) => {
      const { username, quiz_code } = props;
      const findUser = users.findIndex((o) => o === username);
      if (findUser !== -1) {
        users.splice(findUser, 1);

        io.to(quiz_code).emit("server-user-kick", username);
        io.to(quiz_code + "-control").emit("server-user-kick", username);
        io.to(quiz_code + "-control").emit("server-send-users", users);
      }
    });

    socket.on("client-out-user", (props) => {
      const { username, quiz_code } = props;
      const findUser = users.findIndex((o) => o === username);
      if (findUser !== -1) {
        users.splice(findUser, 1);

        io.to(quiz_code).emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit("server-user-disconnect", username);
        io.to(quiz_code + "-control").emit("server-send-users", users);
      }
    });
  });
};

module.exports = socketConnect;
