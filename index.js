const express = require('express')
const app = express()
// port our express app is listening on
const PORT = 8080
// routes
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

app.use(express.json())
app.use('', userRouter)
app.use('', adminRouter)

module.exports = app.listen(PORT, () =>
  console.log(`Running API on PORT ${PORT}`)
)
