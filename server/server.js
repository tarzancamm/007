const express = require("express");
const cors = require("cors");
require("dotenv").config();
const server = express();
const { PORT } = process.env || 4646;
const db = require("./util/database");

const {User, Todo, Lift, Thought, Pr} = require('./util/models')

const { registerUser, login } = require("./controllers/auth");
const {getTodo, addTodo, deleteTodo} = require("./controllers/posts")

// Middleware
server.use(express.json()); //parses requests into json
server.use(cors()); //run client and server on seperate ports

// Relations
User.hasMany(Todo)
Todo.belongsTo(User)
User.hasMany(Lift)
Lift.belongsTo(User)
User.hasMany(Thought)
Thought.belongsTo(User)
User.hasMany(Pr)
Pr.belongsTo(User)


// Endpoints
server.post("/register", registerUser);
server.post("/login", login);

server.get('/todo/:userId', getTodo)
server.post('/todo/:userId', addTodo)
server.delete('/todo/:id', deleteTodo)

db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });
});
