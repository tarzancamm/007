const express = require("express");
const cors = require("cors");
require("dotenv").config();
const server = express();
const { PORT } = process.env || 4646;
const db = require("./util/database");

const { registerUser, login } = require("./controllers/auth");

// Middleware
server.use(express.json()); //parses requests into json
server.use(cors()); //run client and server on seperate ports

server.post("/register", registerUser);
server.post("/login", login);

db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });
});
