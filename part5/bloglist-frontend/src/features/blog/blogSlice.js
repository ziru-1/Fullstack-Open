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
    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
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

export const incrementBlogLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlogLike(blog.id, blog.likes)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (id, user) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, user.token)
    dispatch(deleteBlog(id))
  }
}

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer
