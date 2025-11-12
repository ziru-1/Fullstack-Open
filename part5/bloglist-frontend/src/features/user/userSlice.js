import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (_, action) => action.payload,
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
