import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rolReducer from "./rolSlice";

const rootReducer = combineReducers({
  rol: rolReducer, // TODO ALVARO, NO NECESITO ESTO, ERA PARA ESCRIBIR UN ROL POR PANTALLA.
});

const persistConfig = {
  key: "PersBelongInsQuoteRoot",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware = [thunk, immutableStateInvariant, serializableStateInvariant] <-- Defaults development
// middleware = [thunk] <-- Defaults production
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_INCLUDE_DEVTOOLS === "yes",
  // Customization to avoid some annoying console errors generated by redux-persist.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;