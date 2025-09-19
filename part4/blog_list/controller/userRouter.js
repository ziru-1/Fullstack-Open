const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {user: 0})
  
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!(username && password)) {
    return response.status(400).json({
      error: 'username and password must be present'
    })
  }

  if(username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
