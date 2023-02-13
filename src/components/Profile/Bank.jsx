import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { listActions } from "../../store/lists";
import styles from "./Bank.module.css";

const Bank = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const name = useSelector((state) => state.auth.username);
  const todo = useSelector((state) => state.list.showTodos)
  const pr = useSelector((state) => state.list.showPrs)
  const thought = useSelector((state) => state.list.showThoughts)
  const lift = useSelector((state) => state.list.showLifts)

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const todoHandler = () => {
    dispatch(listActions.todos());
  };
  const prHandler = () => {
    dispatch(listActions.prs());
  };
  const thoughtHandler = () => {
    dispatch(listActions.thoughts());
  };
  const liftHandler = () => {
    dispatch(listActions.lifts());
  };

  return (
    <div className={styles.bank}>
      <p>Welcome, {name}</p>
      <h3>Customize Your Dashboard</h3>
      <div className={styles["bank-lists"]}>
        <div className={styles['bank-lists-item']}>
          <label htmlFor="todo">To-Do</label>
          <input className={styles.checkbox} type="checkbox" id="todo" onChange={todoHandler} checked={todo} />
        </div>
        <div className={styles['bank-lists-item']}>
          <label htmlFor="pr">Weightlifting PRs</label>
          <input className={styles.checkbox} type="checkbox" id="pr" onChange={prHandler} checked={pr} />
        </div>
        <div className={styles['bank-lists-item']}>
          <label htmlFor="lifts">Lifts</label>
          <input className={styles.checkbox} type="checkbox" id="lifts" onChange={liftHandler} checked={lift} />
        </div>
        <div className={styles['bank-lists-item']}>
          <label htmlFor="thoughts">Thoughts</label>
          <input className={styles.checkbox} type="checkbox" id="thoughts" onChange={thoughtHandler} checked={thought} />
        </div>
      </div>
      <div className={styles.logout}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Bank;
