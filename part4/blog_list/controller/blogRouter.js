const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  response.json(blogs)
})

blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if(!decodedToken.id) {
    return response.status(404).json({
      error: 'invalid token'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  )
  response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
