//로그인,로그아웃 리듀서
import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 3 * 1000;

export const tokenSlice = createSlice({
  name: "authToken",
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    //로그인
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    //로그아웃
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export const selectUser = (state) => state.authToken;

//export default tokenSlice.reducer;
export default tokenSlice;
