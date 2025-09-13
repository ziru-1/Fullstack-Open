const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogRouter')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
module.exports = app