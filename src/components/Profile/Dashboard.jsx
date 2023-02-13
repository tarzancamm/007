import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListItem from "./ListItem";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState('')
  const userId = useSelector((state) => state.auth.userId);

//! ToDo
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
        console.log("deleted")
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
      .post(`/todo/${userId}`, body)
      .then(() => {
        getTodo();
        console.log('added')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedTodo = todos.map((todos) => {
    return (
      <li key={todos.id} className={styles.listItem}>
        <ListItem content={todos.content} />
        <button onClick={() => deleteHandler(todos.id)}>X</button>
      </li>
    );
  });

  //! Lifts


  return (
    <div className={styles.dashboard}>
      <div className={styles.box}>
        <h3>To Do</h3>
        <ul>{mappedTodo}</ul>
        <form onSubmit={todoHandler} className={styles.input}>
          <input type="text" onChange={(e) => setTodoItem(e.target.value)} value={todoItem} placeholder="To Do" />
          <button>Submit</button>
        </form>
      </div>
      <div className={styles.box}>
        <h3>Lifts</h3>
      </div>
    </div>
  );
};

export default Dashboard;
