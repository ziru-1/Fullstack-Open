const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter
