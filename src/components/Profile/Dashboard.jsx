import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListItem from "./ListItem";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState("");

  const [lifts, setLifts] = useState([]);
  const [liftItem, setLiftItem] = useState("")

  const userId = useSelector((state) => state.auth.userId);

  //! ToDo
  // Functions in React - function object is created each time component is re-rendered. useCallback memo-izes the function so it only runs if dependency changes.
  const getTodo = useCallback(() => {
    axios
      .get(`/todo/${userId}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const deleteTodoHandler = (id) => {
    axios
      .delete(`/todo/${id}`)
      .then(() => {
        getTodo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoHandler = (e) => {
    e.preventDefault();

    let body = {
      content: todoItem,
      userId,
    };

    axios
      .post(`/todo`, body)
      .then(() => {
        getTodo();
        setTodoItem("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedTodo = todos.map((todos) => {
    return (
      <li key={todos.id} className={styles.listItem}>
        <ListItem content={todos.content} />
        <button onClick={() => deleteTodoHandler(todos.id)}>X</button>
      </li>
    );
  });


  //! Lifts
  const getLifts = useCallback(() => {
    axios
      .get(`/lifts/${userId}`)
      .then((res) => {
        setLifts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const deleteLiftHandler = (id) => {
    axios
      .delete(`/lifts/${id}`)
      .then(() => {
        getLifts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const liftHandler = (e) => {
    e.preventDefault();

    let body = {
      userId,
      content: liftItem,
    };

    axios
      .post(`/lifts`, body)
      .then(() => {
        getLifts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedLifts = lifts.map((lifts) => {
    return (
      <li key={lifts.id} className={styles.listItem}>
        <ListItem content={lifts.content} />
        <button onClick={() => deleteLiftHandler(lifts.id)}>X</button>
      </li>
    );
  });


  //! Get All Lists
  useEffect(() => {
    getTodo();
    getLifts();
  }, [getTodo, getLifts]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.box}>
        <h3>To Do</h3>
        <ul>{mappedTodo}</ul>
        <form onSubmit={todoHandler} className={styles.input}>
          <input
            type="text"
            onChange={(e) => setTodoItem(e.target.value)}
            value={todoItem}
            placeholder="To Do"
          />
          <button>Submit</button>
        </form>
      </div>
      <div className={styles.box}>
        <h3>Lifts</h3>
        <ul>{mappedLifts}</ul>
        <form onSubmit={liftHandler} className={styles.input}>
          <input type="text" onChange={(e) => setLiftItem(e.target.value)} value={liftItem} placeholder="Lift" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
