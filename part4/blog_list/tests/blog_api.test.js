const { test, beforeEach, after, expect } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogModel')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('is unique identifier an id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  assert.ok(blogs[0].id)
  assert.strictEqual(blogs[0]._id, undefined)
})

test('retrieve all blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
