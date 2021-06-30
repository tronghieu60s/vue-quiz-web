require("module-alias/register");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

/* Middleware */
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* MongoDB */
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/myproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("✔️ Connected To Database Successfully!"))
  .catch((err) => console.log(`❌ Failed To Connect To Database!\n ${err}`));

/* Graphql */
const { graphqlHTTP } = require("express-graphql");
const schema = require("@graphql/schema");
const resolvers = require("@graphql/resolvers");
app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);

/* SocketIO */
const socketConfig = {
  cors: {
    origin: "*",
    credentials: true,
  },
};
const server = require("http").createServer(app);
const io = require("socket.io")(server, socketConfig);

require("./socket")(io);

/* Listen Server */
server.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);
