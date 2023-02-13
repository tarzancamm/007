import React from "react";
import Bank from "../components/Profile/Bank";
import Dashboard from "../components/Profile/Dashboard";
import styles from './ProfileScreen.module.css'

const ProfileScreen = () => {

  return (
    <div className={styles.page}>
      <Bank />
      <Dashboard />
    </div>
  );
};

export default ProfileScreen;
