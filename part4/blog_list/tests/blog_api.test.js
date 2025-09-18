const { test, beforeEach, after, expect } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    await api.post('/api/user').send(user)
  }
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

test('create a new blog with valid token', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test E. Kels',
    url: 'test.com',
    likes: 5,
  }

  const userLogin = {
    username: 'Admin',
    password: 'test',
  }

  const user = await api
    .post('/api/login')
    .send(userLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDB()
  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

  assert(
    blogs.some(
      (blog) =>
        blog.title === 'Test Blog' &&
        blog.author === 'Test E. Kels' &&
        blog.url === 'test.com' &&
        blog.likes === 5
    )
  )
})

test('create a new blog with wrong user', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test E. Kels',
    url: 'test.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer `)
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDB()
  assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('default likes to 0 if missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test E. Kels',
    url: 'test.com',
  }

  await api.post('/api/blogs').send(newBlog)

  const blogs = await helper.blogsInDB()

  assert(blogs.every((blog) => Object.keys(blog).length === 5))
})

test('responds bad request if no title nor url properties', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test E. Kels',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate,
    title: 'Updated Title',
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.title, 'Updated Title')

  const blogsAtEnd = await helper.blogsInDB()
  const updated = blogsAtEnd.find((b) => b.id === blogToUpdate.id)
  assert.strictEqual(updated.title, 'Updated Title')
})

after(async () => {
  await mongoose.connection.close()
})
