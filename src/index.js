import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist"; // 추가
import { PersistGate } from "redux-persist/integration/react"; // 추가
import reportWebVitals from "./reportWebVitals";

import store from "./components/modules/store";

// import { applyMiddleware, createStore } from "redux";
// import promiseMiddleware from "redux-promise";
// import ReduxThunk from "redux-thunk";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(createStore);

root.render(
  //<React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </CookiesProvider>
  //</React.StrictMode>
);

reportWebVitals();
