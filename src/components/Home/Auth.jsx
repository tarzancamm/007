import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import styles from "./Auth.module.css";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        dispatch(
          authActions.login({
            token: res.data.token,
            userId: res.data.userId,
            exp: res.data.exp,
          })
        );
        navigate(`/profile/${res.data.userId}`);
        console.log(res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h3>Hero Section</h3>
        </div>
        <div className={styles["login-form"]}>
          <h3>{register ? "Sign Up" : "Login"}</h3>
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Email" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className={styles.create}>
              {register ? "Create" : "Sign In"}
            </button>
          </form>
          <button onClick={() => setRegister(!register)}>
            {register ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
