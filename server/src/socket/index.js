const socketAdmin = require("./socketAdmin");
const socketClient = require("./socketClient");

const socketConnect = (io) =>
  io.on("connection", (socket) => {
    socketAdmin(socket);
    socketClient(socket);
  });

module.exports = socketConnect;
