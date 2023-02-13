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

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const todoHandler = () => {
    dispatch(listActions.todos())
  }
  const prHandler = () => {
    dispatch(listActions.prs())
  }
  const thoughtHandler = () => {
    dispatch(listActions.thoughts())
  }
  const liftHandler = () => {
    dispatch(listActions.lifts())
  }

  return (
    <div className={styles.bank}>
      <p>Welcome, {name}</p>
      <h3>Customize Your Dashboard</h3>
      <div className={styles['bank-lists']}>
        <div>
          <label htmlFor="todo">To-Do</label>
          <input type="checkbox" id="todo" onChange={todoHandler} />
        </div>
        <div>
          <label htmlFor="pr">Weightlifting PRs</label>
          <input type="checkbox" id="pr" onChange={prHandler} />
        </div>
        <div>
          <label htmlFor="lifts">Lifts</label>
          <input type="checkbox" id="lifts" onChange={liftHandler} />
        </div>
        <div>
          <label htmlFor="thoughts">Thoughts</label>
          <input type="checkbox" id="thoughts" onChange={thoughtHandler} />
        </div>
      </div>
      <div className={styles.logout}>
      <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Bank;
