import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListItem from "./ListItem";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = () => {
    axios
      .get(`/todo/${userId}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoHandler = (e) => {
    e.preventDefault();

    let body = {
      content: todoRef.current.value,
      userId,
    };

    axios
      .post(`/todo/${userId}`, body)
      .then(() => {
        getTodo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedTodo = todos.map((todos) => {
    return (
      <li>
        <ListItem key={todos.id} content={todos.content} />
      </li>
    );
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.todo}>
        <h3>To Do</h3>
        <ul>{mappedTodo}</ul>
        <form onSubmit={todoHandler} className={styles.input}>
          <input type="text" ref={todoRef} placeholder="To Do" />
          <button>Submit</button>
        </form>
      </div>
      <div className={styles.lifts}></div>
    </div>
  );
};

export default Dashboard;
