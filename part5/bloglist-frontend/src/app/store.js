import { configureStore } from '@reduxjs/toolkit'
import notifReducer from '../features/notif/notifSlice'
import blogsReducer from '../features/blog/blogSlice'
import userReducer from '../features/user/userSlice'

export default configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})