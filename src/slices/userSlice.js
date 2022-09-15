import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
//login asynchronous thunk
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  const res = await api.post("/auth/login", user);
  console.log(res.data);
  return res.data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    authenticating: false,
    authenticationError: false,
    authenticatedUser: false,
  },
  reducers: {
    //logging out will clear user, authenticating, authenticatedError and authenticatedUser from the session storage
    logout: (state) => {
      state.currentUser = null;
      state.authenticating = false;
      state.authenticationError = false;
      state.authenticatedUser = false;
    },
    updateUserAuthenticationStatus: (state, action) => {
      state.authenticatedUser = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        //login success
        state.authenticating = false;
        state.authenticationError = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        //login failed
        state.authenticating = false;
        state.authenticationError = true;
      })
      .addCase(login.pending, (state) => {
        //logging in
        state.authenticating = true;
      });
  },
});
export const { logout, updateUserAuthenticationStatus } = userSlice.actions;
export default userSlice.reducer;
