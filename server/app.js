const logger = require("morgan");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

/* Middleware */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* MongoDB */
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
const graphQlSchema = require("./src/graphql/schema");
const graphqlResolvers = require("./src/graphql/resolvers");
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
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
