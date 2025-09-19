const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const initialBlogs = [
  {
    title: 'My Very first blog',
    author: 'Sara P. Wow',
    url: 'wow.com',
    likes: 2,
  },
  {
    title: 'Second blog',
    author: 'Handle Name',
    url: 'weeee.com',
    likes: 4,
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB
}
