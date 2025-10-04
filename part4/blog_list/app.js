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
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test'){
    console.log('testing mode')
    const testRouter = require('./controller/testRouter')
    app.use('/api/test', testRouter)
}

app.use(middleware.errorHandler)

module.exports = app