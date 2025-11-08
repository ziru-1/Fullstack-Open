import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const initalizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const appendBlog = (blogDetails, user) => {
  return async (dispatch) => {
    const addedBlog = await blogService.addBlog(blogDetails, user.token)
    dispatch(addBlog(addedBlog))
  }
}

export const { setBlogs, addBlog } = blogSlice.actions

export default blogSlice.reducer
