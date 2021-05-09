require("dotenv").config({ path: ".env.local" });
const express = require("express");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const socketConfig = {
  cors: {
    origin: ["http://localhost", process.env.APP_CUSTOM_CLIENT_URL],
    credentials: true,
  },
};
const server = require("http").createServer(app);
const io = require("socket.io")(server, socketConfig);

require("./socket")(io);

server.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);
