import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../../types";


const DEFAULT_STATE: LoginResponse = {
  accessToken: "",
  refreshToken: "",
  id: 0,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: ""
}

const initialState = (() => { 
  const persistedState = localStorage.getItem('accessToken')
  if(persistedState) {
    return JSON.parse(persistedState)
  } else {
    return DEFAULT_STATE 
  }
})()


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<LoginResponse>) => {
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
      return action.payload
    },
    logout: (_state) => {
      localStorage.removeItem("accessToken");
      return initialState
    },
  },
  
})

export default usersSlice.reducer

export const { logout, login } = usersSlice.actions