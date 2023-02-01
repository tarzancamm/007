import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const ProfileScreen = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div>
      <div>ProfileScreen</div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default ProfileScreen;
