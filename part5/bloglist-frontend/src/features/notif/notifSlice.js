import { createSlice } from '@reduxjs/toolkit'

export const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    message: '',
    isError: false
  },
  reducers: {
    setNotif: (_, action) => action.payload,
    resetNotif: () => ({ message: '', isError: false }),
  },
})

// Action creators are generated for each case reducer function
export const { setNotif, resetNotif } = notifSlice.actions

export default notifSlice.reducer
