require("dotenv").config();
const { Todo } = require("../util/models");
const { Pr } = require("../util/models");
const { Lift } = require("../util/models");
const { Thought } = require("../util/models");

module.exports = {
  getTodo: async (req, res) => {
    try {
      const { userId } = req.params;
      const todoList = await Todo.findAll({
        where: { userId: userId },
      });
      res.status(200).send(todoList);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not retrieve To Do list");
    }
  },

  addTodo: async (req, res) => {
    try {
      const { userId, content } = req.body;
      await Todo.create({ userId, content });
      res.status(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not add to To Do");
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const {id} = req.params
      await Todo.destroy({where: {id: +id}})
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.status(400).send("Could not delete To Do")
    }
  }
};
