import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import styles from "./Auth.module.css";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState('')
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        dispatch(
          authActions.login({
            token: res.data.token,
            userId: res.data.userId,
            email: res.data.email,
            username: res.data.username,
            exp: res.data.exp,
          })
        );
        navigate(`/profile/${res.data.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles["login-form"]}>
          <h3>{register ? "Sign Up" : "Login"}</h3>
          <form onSubmit={submitHandler}>
            {register && <input type="text" placeholder="First Name" onChange={(e) => setUsername(e.target.value)} />}
            <input type="text" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className={styles.create}>
              {register ? "Create" : "Sign In"}
            </button>
          </form>
          <button className={styles.switch} onClick={() => setRegister(!register)}>
            {register ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
