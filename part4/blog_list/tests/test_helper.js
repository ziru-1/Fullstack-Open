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

const initialUsers = [
  {
    username: 'Admin',
    name: 'Admin',
    passwordHash: 'test',
    blogs: [],
  },
  {
    username: 'Test 1',
    name: 'Test 2',
    passwordHash: 'test',
    blogs: [],
  }
]

const invalidUsers = [
  { username: 'Ad', name: 'Admin', password: 'test' },
  { username: 'Admin', name: 'Admin', password: 'te' }
];

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
  initialUsers,
  invalidUsers,
  blogsInDB,
  usersInDB
}
