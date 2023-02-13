import { createSlice } from "@reduxjs/toolkit";

let initialListState = {
  showTodos: false,
  showPrs: false,
  showThoughts: false,
  showLifts: false,
};

const listSlice = createSlice({
  name: "lists",
  initialState: initialListState,
  reducers: {
    todos(state) {
      state.showTodos = !state.showTodos;
    },
    prs(state) {
      state.showPrs = !state.showPrs;
    },
    thoughts(state) {
      state.showThoughts = !state.showThoughts;
    },
    lifts(state) {
      state.showLifts = !state.showLifts;
    },
  },
});

export const listActions = listSlice.actions; // Imported by components
export default listSlice.reducer; // Imported by store.js
