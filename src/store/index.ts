import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from './users/slice';


const persistanceLogginMiddleware: Middleware = (store) => (next) => (action) => {
  console.log(store.getState())
  console.log(action);
  next(action)
  console.log(store.getState());
}

export const store = configureStore({
  reducer: {
    authUser: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLogginMiddleware)
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch