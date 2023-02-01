import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  userId: null,
};

// Declaring logoutTimer variable in global scope for later use
let logoutTimer;

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime(); // Current time in milliseconds since Jan 1, 1970
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

// const getLocalData = () => {
//   const localToken = localStorage.getItem("token");
//   const localUserId = localStorage.getItem("userId");
//   const localExp = localStorage.getItem("exp");

//   const remainingExpTime = calculateRemainingTime(localExp);

//   // Set to one hour
//   if (remainingExpTime <= 6000) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("exp");
//     return null;
//   }

//   return {
//     token: localToken,
//     userId: +localUserId,
//     duration: remainingExpTime,
//   };
// };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token
      state.userId = action.payload.userId
      localStorage.setItem("token", state.token)
      localStorage.setItem("userId", state.userId)
      localStorage.setItem("exp", action.payload.exp)
      
      const remainingExpTime = calculateRemainingTime(action.payload.exp);

      logoutTimer = setTimeout(authSlice.actions.logout, remainingExpTime); //Runs logout function after delay (remainingExpTime)
    },
    logout(state) {
        state.token = null
        state.userId = null
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("exp")

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }
  },
});

export const authActions = authSlice.actions; // Imported by components
export default authSlice.reducer; // Imported by store.js
