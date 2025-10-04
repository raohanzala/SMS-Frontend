import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.isAuthenticated = true
      state.user = payload.user
    },
    logout: (state) => {
      console.log('LOGOUT')
      state.token = initialState.token
      state.isAuthenticated = false
    },
    userData: () => {

    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
