import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js"; // The path to your user slice
// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    // report: reportReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["persist/PERSIST"], // Ignore this action for serializability check
  //     },
  //   }),
});
// export const persistor = persistStore(store);
