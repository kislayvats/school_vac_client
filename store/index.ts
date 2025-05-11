// modules
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// slice files import
import schoolAdminReducer from "./schoolAdminSlice";
import modalReducer from "./modalSlice";
import drawerReducer from "./drawerSlice";
import storage from "./storage";

// =======================================================
// =============REDUCER AND MIDDLEWARE LOGIC==============
// =======================================================

// this combines all of the slices and forms a single store
// from where we can fetch the state as per requirement
const reducers = combineReducers({
  schoolAdmin: schoolAdminReducer,
  modal: modalReducer,
  drawer: drawerReducer,
 
});
// this sets up the redux persist
const config = {
  key: "root",
  storage,
  blacklist: [
    "modal",
    "drawer",
  ],
};

const reducer = persistReducer(config, reducers);

// this is final configuration made to establish the store with reducers, middlewares and devtools
// all packed in one and called "store"
const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
