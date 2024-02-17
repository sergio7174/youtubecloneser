
/* Las operaciones de almacenamiento se realizan para poder utilizar Slice' y mantener el estado global.

/***configureStore: A friendly abstraction over the standard Redux createStore function that adds good defaults to the store setup for a better development experience. */

/****combineReducers(reducers)

As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state.

The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.

The resulting reducer calls every child reducer, and gathers their results into a single state object. The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers() */

// configureStore(): Estructura utilizada para definir reductores.

import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import videoReducer from "../redux/videoSlice.js";

/* React Redux Persist */
import {  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE,
          PERSIST, PURGE, REGISTER,} from 'redux-persist';

import storage from 'redux-persist/lib/storage'
//import {PersistGate} from 'redux-persist/integration/react'

/* React Redux Persist Config */
/** FROM REDUX-PERSIST */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

/** FROM REDUX-TOOLKIT */
const rootReducer = combineReducers({
   
    user: userReducer, 
    video: videoReducer
})

/* Persist Reducer */
// rootReducer COMING FROM LINE 32 --> 
const persistedReducer = persistReducer(persistConfig, rootReducer) 

export const store = configureStore({

  reducer: persistedReducer, // COMING FROM LINE 40

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

/* Persistor export */
export const persistor = persistStore(store)