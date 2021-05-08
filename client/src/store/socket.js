import { io } from "socket.io-client";

export const socketConnect = () => {
  const socket = io("http://localhost:4000");
  return new Promise((resolve, reject) => {
    socket.on("connect", async () => {
      resolve(socket);
    });
    socket.on("connect_error", function () {
      reject(new Error("connect_error"));
    });
    socket.on("connect_timeout", function () {
      reject(new Error("connect_timeout"));
    });
  });
};
