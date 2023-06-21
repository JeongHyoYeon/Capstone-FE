import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import tokenSlice from "../modules/slices/tokenSlice";

const reducers = combineReducers({
  authToken: tokenSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authToken"],
};


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
