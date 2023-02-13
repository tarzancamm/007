const express = require("express");
const cors = require("cors");
require("dotenv").config();
const server = express();
const { PORT } = process.env || 4646;
const db = require("./util/database");

const {User, Todo, Lift, Thought, Pr} = require('./util/models')

const { registerUser, login } = require("./controllers/auth");
const {getTodo, addTodo, deleteTodo, getLift, addLift, deleteLift, getThought, addThought, deleteThought, getPr, addPr, deletePr} = require("./controllers/posts")

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
server.post('/todo', addTodo)
server.delete('/todo/:id', deleteTodo)

server.get('/lifts/:userId', getLift)
server.post('/lifts', addLift)
server.delete('/lifts/:id', deleteLift)

server.get('/thoughts/:userId', getThought)
server.post('/thoughts', addThought)
server.delete('/thoughts/:id', deleteThought)

server.get('/prs/:userId', getPr)
server.post('/prs', addPr)
server.delete('/prs/:id', deletePr)

db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });
});
