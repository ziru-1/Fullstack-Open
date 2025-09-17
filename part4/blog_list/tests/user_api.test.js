const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/userModel')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('get initial users from db', async () => {
  const response = await api
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialUsers.length)
})

describe('add user that is', () => {
  test('valid', async () => {
    const newUser = {
      username: 'New',
      name: 'New',
      password: 'test',
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes('New'))
  })

  test('existing', async () => {
    const newUser = {
      username: 'Admin',
      name: 'Admin',
      password: 'test',
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

  for (const invalidUser of helper.invalidUsers) {
    test(`invalid: ${JSON.stringify(invalidUser)}`, async () => {
      const result = await api
        .post('/api/user')
        .send(invalidUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDB()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

      assert(
        result.body.error.includes(
          'username and password must be at least 3 characters'
        )
      )
    })
  }
})

after(async () => {
  await mongoose.connection.close()
})
