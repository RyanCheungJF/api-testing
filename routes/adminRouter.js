const express = require('express')
const axios = require('axios')
const app = express()
const {
  checkIfAuthenticated,
  checkIfAdmin,
} = require('../middleware/middleware')
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} = require('@firebase/auth')
const auth = require('../firebase')
const admin = require('../firebase-config')

app.get('/home', checkIfAuthenticated, async (_, res) => {
  return res.status(200).send({ message: 'Welcome authenticated user!' })
})

app.get('/home/admin', checkIfAdmin, async (_, res) => {
  return res.status(200).send({ message: 'Welcome to the admin portal!' })
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

// turns a normal user into an admin
app.get('/admin', async (_, res) => {
  const user = getAuth().currentUser
  if (!user) {
    res
      .status(401)
      .send({ message: 'You are not authenticated to make this request!' })
    return
  }
  const uid = user.uid
  await admin.auth().setCustomUserClaims(uid, { admin: true })
  return res.status(400).send({ message: 'Success!' })
})

// mocks client request for any user who is authenticated after login
app.get('/client', async (_, res) => {
  const user = getAuth().currentUser
  if (!user) {
    res
      .status(401)
      .send({ message: 'You are not authenticated to make this request!' })
    return
  }
  const token = await user.getIdToken()

  return axios
    .get('http://localhost:8080/home', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((err) => {
      res.status(err.response.status).send({ message: err.response.data.error })
    })
})

// mocks client request for any user who is authhorized as an admin
app.get('/client/admin', async (_, res) => {
  const user = getAuth().currentUser
  if (!user) {
    res
      .status(401)
      .send({ message: 'You are not authenticated to make this request!' })
    return
  }
  const token = await user.getIdToken()

  return axios
    .get('http://localhost:8080/home/admin', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((err) => {
      res.status(err.response.status).send({ message: err.response.data.error })
    })
})

module.exports = app
