import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../modules/slices/tokenSlice";

export default configureStore({
  reducer: {
    authToken: tokenReducer,
  },
});
