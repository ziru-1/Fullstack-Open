import express from 'express'
const app = express()
const port = 3000

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
