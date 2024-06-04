import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import {  store } from "./redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <UserProvider>
  <>
    <Toaster />
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
          {/* </PersistGate> */}
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  </>
  // </UserProvider>
);
