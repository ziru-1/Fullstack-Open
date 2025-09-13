const Blog = require('../models/blogModel')

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

module.exports = {
  initialBlogs,
  blogsInDB,
}
