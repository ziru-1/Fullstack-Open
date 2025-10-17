import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: '',
  reducers: {
    addNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return ''
    },
  },
})

const { addNotif, removeNotif } = notifSlice.actions

export const setNotif = (message, duration) => {
  return async (dispatch) => {
    dispatch(addNotif(message))
    setTimeout(() => {
      dispatch(removeNotif())
    }, duration * 1000)
  }
}

export default notifSlice.reducer
