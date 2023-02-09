import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListItem from "./ListItem";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const userId = useSelector((state) => state.auth.userId);

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

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  const deleteHandler = (id) => {
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
      <div key={todos.id} className={styles.listItem}>
        <ListItem content={todos.content} />
        <button onClick={() => deleteHandler(todos.id)}>X</button>
      </div>
    );
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.todo}>
        <h3>To Do</h3>
        <main>{mappedTodo}</main>
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
