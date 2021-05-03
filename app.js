const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: err.message,
  });
  next(err);
});

const socketConfig = {
  cors: { origin: "http://localhost:8080", credentials: true },
};
const server = require("http").createServer(app);
const io = require("socket.io")(server, socketConfig);

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);
  // console.log(socket.adapter.rooms);

  socket.on("disconnect", () => {
    console.log("a user disconnected: " + socket.id);
    console.log(socket.adapter.rooms);
  });
});

server.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);
