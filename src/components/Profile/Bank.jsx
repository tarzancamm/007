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
          <label htmlFor="">To-Do</label>
          <input type="checkbox" onChange={() => setShowTodo(!showTodo)} />
        </div>
        <div>
          <label htmlFor="">Weightlifting PRs</label>
          <input type="checkbox" onChange={() => setShowPr(!showPr)} />
        </div>
        <div>
          <label htmlFor="">Lifts</label>
          <input type="checkbox" onChange={() => setShowLift(!showLift)} />
        </div>
        <div>
          <label htmlFor="">Thoughts</label>
          <input type="checkbox" onChange={() => setShowThought(!showThought)} />
        </div>
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Bank;
