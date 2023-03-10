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
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not add to To Do");
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not delete To Do");
    }
  },

  getLift: async (req, res) => {
    try {
      const { userId } = req.params;
      const liftList = await Lift.findAll({ where: { userId: userId } });
      res.status(200).send(liftList);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not retrieve Lifts list");
    }
  },

  addLift: async (req, res) => {
    try {
      const { userId, content } = req.body;
      await Lift.create({ userId, content });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not add to Lifts");
    }
  },

  deleteLift: async (req, res) => {
    try {
      const { id } = req.params;
      await Lift.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not delete Lift");
    }
  },

  getThought: async (req, res) => {
    try {
      const { userId } = req.params;
      const thoughtList = await Thought.findAll({ where: { userId: userId } });
      res.status(200).send(thoughtList);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not retrieve Thoughts list");
    }
  },

  addThought: async (req, res) => {
    try {
      const { userId, content } = req.body;
      await Thought.create({ userId, content });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not add to Thoughts");
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { id } = req.params;
      await Thought.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not delete Thought");
    }
  },

  getPr: async (req, res) => {
    try {
      const { userId } = req.params;
      const prList = await Pr.findAll({ where: { userId: userId } });
      res.status(200).send(prList);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not retrieve PR list");
    }
  },

  addPr: async (req, res) => {
    try {
      const { userId, content } = req.body;
      await Pr.create({ userId, content });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not add to PRs");
    }
  },

  deletePr: async (req, res) => {
    try {
      const { id } = req.params;
      await Pr.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(400).send("Could not delete PR");
    }
  },
};
