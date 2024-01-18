import { createSlice } from "@reduxjs/toolkit";

// ! A slice is a section of the store
// ! We create it and we take it to the store
const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // ! to update the state, action : payload coming to us from UI or firebase
    setUser: (state, action) => {
      // set logged user
    },
    setUsers: (state, action) => {
      // set all users
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
