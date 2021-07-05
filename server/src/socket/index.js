const socketAdmin = require("./socketAdmin");
const socketClient = require("./socketClient");

const socketConnect = (io) =>
  io.on("connection", (socket) => {
    socketAdmin(io, socket);
    socketClient(io, socket);
  });

module.exports = socketConnect;
