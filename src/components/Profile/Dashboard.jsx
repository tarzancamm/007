import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListItem from "./ListItem";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState("");

  const [lifts, setLifts] = useState([]);
  const [liftItem, setLiftItem] = useState("");

  const [thoughts, setThoughts] = useState([]);
  const [thoughtItem, setThoughtItem] = useState("");

  const [prs, setPrs] = useState([]);
  const [prItem, setPrItem] = useState("");

  const userId = useSelector((state) => state.auth.userId);
  const showTodos = useSelector((state) => state.list.showTodos);
  const showPrs = useSelector((state) => state.list.showPrs);
  const showThoughts = useSelector((state) => state.list.showThoughts);
  const showLifts = useSelector((state) => state.list.showLifts);

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
        setThoughtItem("");
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

  //! Thoughts
  const getThoughts = useCallback(() => {
    axios
      .get(`/thoughts/${userId}`)
      .then((res) => {
        setThoughts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const deleteThoughtHandler = (id) => {
    axios
      .delete(`/thoughts/${id}`)
      .then(() => {
        getThoughts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const thoughtHandler = (e) => {
    e.preventDefault();

    let body = {
      userId,
      content: thoughtItem,
    };

    axios
      .post(`/thoughts`, body)
      .then(() => {
        getThoughts();
        setThoughtItem("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedThoughts = thoughts.map((thoughts) => {
    return (
      <li key={thoughts.id} className={styles.listItem}>
        <ListItem content={thoughts.content} />
        <button onClick={() => deleteThoughtHandler(thoughts.id)}>X</button>
      </li>
    );
  });

  //! PRs
  const getPrs = useCallback(() => {
    axios
      .get(`/prs/${userId}`)
      .then((res) => {
        setPrs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const deletePrHandler = (id) => {
    axios
      .delete(`/prs/${id}`)
      .then(() => {
        getPrs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prHandler = (e) => {
    e.preventDefault();

    let body = {
      userId,
      content: prItem,
    };

    axios
      .post(`/prs`, body)
      .then(() => {
        getPrs();
        setPrItem("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedPrs = prs.map((prs) => {
    return (
      <li key={prs.id} className={styles.listItem}>
        <ListItem content={prs.content} />
        <button onClick={() => deletePrHandler(prs.id)}>X</button>
      </li>
    );
  });

  //! Get All Lists
  useEffect(() => {
    getTodo();
    getLifts();
    getThoughts();
    getPrs();
  }, [getTodo, getLifts, getThoughts, getPrs]);

  return (
    <div className={styles.dashboard}>
      {showTodos && (
        <div className={styles.box}>
          <h3>To Do</h3>
          <ul>{mappedTodo}</ul>
          <form onSubmit={todoHandler} className={styles.input}>
            <input
              type="text"
              onChange={(e) => setTodoItem(e.target.value)}
              value={todoItem}
              placeholder="To Do"
              className={styles["input-field"]}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
      {showLifts && (
        <div className={styles.box}>
          <h3>Lifts</h3>
          <ul>{mappedLifts}</ul>
          <form onSubmit={liftHandler} className={styles.input}>
            <input
              type="text"
              onChange={(e) => setLiftItem(e.target.value)}
              value={liftItem}
              placeholder="Lift"
              className={styles["input-field"]}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
      {showThoughts && (
        <div className={styles.box}>
          <h3>Thoughts</h3>
          <ul>{mappedThoughts}</ul>
          <form onSubmit={thoughtHandler} className={styles.input}>
            <input
              type="text"
              onChange={(e) => setThoughtItem(e.target.value)}
              value={thoughtItem}
              placeholder="Thought"
              className={styles["input-field"]}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
      {showPrs && (
        <div className={styles.box}>
          <h3>Weightlifting PRs</h3>
          <ul>{mappedPrs}</ul>
          <form onSubmit={prHandler} className={styles.input}>
            <input
              type="text"
              onChange={(e) => setPrItem(e.target.value)}
              value={prItem}
              placeholder="PR"
              className={styles["input-field"]}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
