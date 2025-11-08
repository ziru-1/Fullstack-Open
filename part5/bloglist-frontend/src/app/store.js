import { configureStore } from '@reduxjs/toolkit'
import notifReducer from '../features/notif/notifSlice'
import blogsReducer from '../features/blog/blogSlice'

export default configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogsReducer
  }
})