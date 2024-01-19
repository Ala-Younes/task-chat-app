import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types/types";

export const defaultUser: userType = {
  id: "",
  img: "",
  isOnline: false,
  name: "",
  email: "",
  bio: "",
  creationTime: "",
  lastSeen: "",
};

// ! A slice is a section of the store
// ! We create it and we take it to the store
const initialState = {
  // user: [],
  currentUser: defaultUser,
  // currentSelectedUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // ! to update the state, action : payload coming to us from UI or firebase
    setUser: (state, action) => {
      console.log(action);

      // set logged user 
      // ! We dispatched the setUser method with the values that we want to put on it
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      // set all users
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
