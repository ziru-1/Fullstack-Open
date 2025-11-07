import { configureStore } from '@reduxjs/toolkit'
import notifReducer from '../features/notif/notifSlice'

export default configureStore({
  reducer: {
    notif: notifReducer
  }
})