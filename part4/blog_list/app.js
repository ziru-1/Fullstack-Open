const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogRouter')
const userRouter = require('./controller/userRouter')
const loginRouter = require('./controller/loginRouter')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to mongodb')
})

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app