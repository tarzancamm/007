import React, { useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import styles from "./Auth.module.css";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username: usernameRef,
      passowrd: passwordRef,
    };

    axios
      .post(register ? "/addUser" : "/login", body)
      .then((res) => {
        navigate(`/profile/${res.data.userId}`)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h3>Hero Section</h3>
        </div>
        <div className={styles['login-form']}>
          <h3>{register ? "Sign Up" : "Login"}</h3>
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Email" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
          </form>
          <button onClick={() => setRegister(!register)}>{register ? "Login" : "Create Account"}</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
