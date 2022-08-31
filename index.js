const express = require('express')
const app = express()
// port our express app is listening on
const PORT = 8080
// routes
const userRouter = require('./routes/userRouter')

app.use(express.json())
app.use('', userRouter)

module.exports = app.listen(PORT, () =>
  console.log(`Running API on PORT ${PORT}`)
)
