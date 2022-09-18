const express = require('express')
const axios = require('axios')
const app = express()
const checkIfAuthenticated = require('../middleware/middleware')
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} = require('@firebase/auth')
const auth = require('../firebase')

app.get('/home', checkIfAuthenticated, async (req, res) => {
  return res.status(200).send({ message: 'Welcome authenticated user!' })
})

app.post('/signup', (req, res) => {
  const { email, password } = req.body
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      res.status(200).send({ message: 'Successful Signup!' })
    })
    .catch((err) => {
      res.status(400).send({ message: 'Failed to signup' })
    })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      res.status(200).send({ message: 'Successful login!' })
    })
    .catch((err) => {
      res.status(400).send({ message: 'Failed to login' })
    })
})

// mocks client request
app.get('/client', async (_, res) => {
  const token = await getAuth().currentUser.getIdToken()

  return axios
    .get('http://localhost:8080/home', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({ message: 'Failed to achieve request!' })
    })
})

module.exports = app
