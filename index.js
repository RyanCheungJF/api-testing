const app = require('express')()
// port our express app is listening on
const PORT = 8080

app.use(require('express').json())

// dummy data
var users = [
  {
    id: 1,
    name: 'Ryan Cheung',
    age: 23,
  },
  {
    id: 2,
    name: 'Esther Sim',
    age: 22,
  },
  {
    id: 3,
    name: 'Lea Davis',
    age: 21,
  },
  {
    id: 4,
    name: 'Citizen Kane',
    age: 20,
  },
]

// gets all users
app.get('/users', (req, res) => {
  console.log(users)
  res.status(200).send(users)
})

// gets user by id
app.get('/user/:id', (req, res) => {
  const id = req.params.id
  const user = users.find((u) => u.id === parseInt(id))
  if (!user) {
    console.log('User does not exist')
    res.status(404).send({ message: 'User does not exist' })
    return
  }
  console.log(user)
  res.status(200).send(user)
})

// adds a new user
app.post('/user/:id', (req, res) => {
  const id = req.params.id
  const user = users.find((u) => u.id === parseInt(id))
  if (user) {
    console.log('User exists')
    res.status(404).send({ message: 'User exists' })
    return
  }
  if (!req.body.name || !req.body.age) {
    console.log('Missing fields!')
    res.status(404).send({ message: 'Missing fields!' })
    return
  }
  const newUser = {
    id: parseInt(id),
    name: req.body.name,
    age: req.body.age,
  }
  users.push(newUser)
  console.log(newUser)
  res.status(201).send(newUser)
})

// updates a new user
app.put('/user/:id', (req, res) => {
  const id = req.params.id
  const user = users.find((u) => u.id === parseInt(id))
  if (!user) {
    console.log('User does not exist')
    res.status(404).send({ message: 'User does not exist' })
    return
  }
  const newUser = {
    id: parseInt(id),
    name: user.name,
    age: user.age,
  }
  // updates fields if specified
  if (req.body.name) {
    newUser.name = req.body.name
  }
  if (req.body.age) {
    newUser.age = req.body.age
  }
  const index = users.indexOf(user)
  users[index] = newUser
  console.log(newUser)
  res.status(200).send(newUser)
})

// deletes user by id
app.delete('/user/:id', (req, res) => {
  const id = req.params.id
  const user = users.find((u) => u.id === parseInt(id))
  if (!user) {
    console.log('User does not exist, did not delete')
    res.status(404).send({ message: 'User does not exist, did not delete' })
    return
  }
  const index = users.indexOf(user)
  users.splice(index, 1)
  console.log(user)
  res.status(204)
})

app.listen(PORT, () => console.log(`Running API on PORT ${PORT}`))

module.exports = app
