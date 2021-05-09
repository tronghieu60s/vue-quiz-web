import { io } from "socket.io-client";

const SERVER = process.env.VUE_APP_SERVER_URL;

export const socketConnect = () => {
  const socket = io(SERVER);
  return new Promise((resolve, reject) => {
    socket.on("connect", () => resolve(socket));
    socket.on("connect_error", () => reject(new Error("connect_error")));
    socket.on("connect_timeout", () => reject(new Error("connect_timeout")));
  });
};
