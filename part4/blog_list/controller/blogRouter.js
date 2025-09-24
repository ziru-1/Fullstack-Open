const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blogModel')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  response.json(blogs)
})

blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', 'username name');

  response.status(201).json(populatedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate('user', 'username name')

  response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id
  const user = request.user

  const blog = await Blog.findById(blogId)

  if (user.id !== blog.user.toString()) {
    return response.status(403).json({
      error: 'user does not own this blog',
    })
  }

  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

module.exports = blogRouter
