import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import { Campus } from "@/api/campuses";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[] | "ALL";
  user: User | null;
  campus: Campus | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  permissions: [],
  user: null,
  campus: null
};

console.log('AUTH STATE', initialState)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.isAuthenticated = true
      state.user = payload.user
      state.permissions = payload.user.permissions
    },
    setToken: (state, { payload }) => {
      state.token = payload
    },
    setCampus: (state, { payload }) => {
      state.campus = payload
    },
    logout: (state) => {
      state.token = initialState.token
      state.isAuthenticated = false
      state.permissions = initialState.permissions
      state.user = initialState.user
    },
    userData: () => {

    }
  },
});

export const { setCredentials, logout, setToken, setCampus } = authSlice.actions;

export default authSlice.reducer;
