import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import styles from "./Bank.module.css";

const Bank = () => {
  const [showTodo, setShowTodo] = useState(false);
  const [showPr, setShowPr] = useState(false);
  const [showLift, setShowLift] = useState(false);
  const [showThought, setShowThought] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const name = useSelector((state) => state.auth.username);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div className={styles.bank}>
      <p>Welcome, {name}</p>
      <p>Customize Your Dashboard</p>
      <div>
        <div>
          <label htmlFor="todo">To-Do</label>
          <input type="checkbox" id="todo" onChange={() => setShowTodo(!showTodo)} />
        </div>
        <div>
          <label htmlFor="pr">Weightlifting PRs</label>
          <input type="checkbox" id="pr" onChange={() => setShowPr(!showPr)} />
        </div>
        <div>
          <label htmlFor="lifts">Lifts</label>
          <input type="checkbox" id="lifts" onChange={() => setShowLift(!showLift)} />
        </div>
        <div>
          <label htmlFor="thoughts">Thoughts</label>
          <input type="checkbox" id="thoughts" onChange={() => setShowThought(!showThought)} />
        </div>
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Bank;
