const app = require('express')()
// port our express app is listening on
const PORT = 8080
// path of dummy data file
const PATH = __dirname + '/dummy/users.json'
// for reading and writing to our dummy data file
var fs = require('fs')

app.use(require('express').json())

// gets all users
app.get('/users', (req, res) => {
  fs.readFile(PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send({ message: 'Failed to get!' })
      return
    }
    const jsonData = JSON.parse(data)
    console.log(jsonData)
    res.status(200).send(jsonData)
  })
})

// gets user by id
app.get('/user/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(PATH, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: 'Failed to get!' })
      return
    }
    const jsonData = JSON.parse(data)
    const user = jsonData['user' + id]

    // error checking to see if user exists in our data
    if (user) {
      console.log(user)
      res.status(200).send(user)
    } else {
      console.log('User does not exist')
      res.status(404).send({ message: 'User does not exist' })
    }
  })
})

// adds a new user
app.post('/user/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(PATH, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: 'Failed to post!' })
      return
    }
    const jsonData = JSON.parse(data)
    const user = jsonData['user' + id]

    // checks to see if a user already exists
    if (user) {
      console.log('User exists')
      res.status(404).send({ message: 'User exists' })
    } else {
      // checks to see if all our fields are in our request body
      if (!req.body.name || !req.body.age) {
        console.log('Missing fields!')
        res.status(404).send({ message: 'Missing fields!' })
        return
      }

      const newUser = {
        id: id,
        name: req.body.name,
        age: req.body.age,
      }
      jsonData['user' + id] = newUser
      fs.writeFile(PATH, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) {
          console.log(err)
          res.status(404).send({ message: 'Failed to post!' })
          return
        }
      })
      console.log(newUser)
      res.status(200).send(newUser)
    }
  })
})

// updates a new user
app.put('/user/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(PATH, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: 'Failed to put!' })
      return
    }
    const jsonData = JSON.parse(data)
    const user = jsonData['user' + id]

    // checks to see if a user already exists
    if (!user) {
      console.log('User does not exist')
      res.status(404).send({ message: 'User does not exist' })
    } else {
      const newUser = {
        id: id,
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
      jsonData['user' + id] = newUser
      fs.writeFile(PATH, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) {
          console.log(err)
          res.status(404).send({ message: 'Failed to put!' })
          return
        }
      })
      console.log(newUser)
      res.status(200).send(newUser)
    }
  })
})

// deletes user by id
app.delete('/user/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(PATH, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: 'Failed to delete!' })
      return
    }
    const jsonData = JSON.parse(data)
    const user = jsonData['user' + id]

    // error checking to see if user exists in our data
    if (user) {
      delete jsonData['user' + id]
      fs.writeFile(PATH, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) {
          console.log(err)
          res.status(404).send({ message: 'Failed to delete!' })
          return
        }
      })
      console.log('Deleting user ' + id)
      res.status(200).send(user)
    } else {
      console.log('Failed to delete user as it does not exist')
      res
        .status(404)
        .send({ message: 'Failed to delete user as it does not exist' })
    }
  })
})

app.listen(PORT, () => console.log(`Running API on PORT ${PORT}`))
