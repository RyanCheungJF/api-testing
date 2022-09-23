const admin = require('../firebase-config')
//redis
const redis = require('redis')
let redisClient
;(async () => {
  redisClient = redis.createClient()
  redisClient.on('error', (error) => console.error(`Error : ${error}`))
  redisClient.on('connect', () => console.log('Hello Redis!'))
  await redisClient.connect()
})()

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1]
  } else {
    req.authToken = null
  }
  next()
}

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req
      const userInfo = await admin.auth().verifyIdToken(authToken)
      req.authId = userInfo.uid
      return next()
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authenticated to make this request!' })
    }
  })
}

const checkIfAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req
      const userInfo = await admin.auth().verifyIdToken(authToken)
      if (!userInfo.admin) {
        throw new Error('Unauthorized!')
      }
      req.authId = userInfo.uid
      return next()
    } catch (e) {
      return res
        .status(403)
        .send({ error: 'You are not authorized to make this request!' })
    }
  })
}

const cacheData = async (_, res, next) => {
  try {
    const cacheResults = await redisClient.get('persons')
    if (cacheResults) {
      return res.status(200).send({
        fromCache: true,
        data: JSON.parse(cacheResults),
      })
    } else {
      return next()
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send({ message: 'Issue reading from Redis!' })
  }
}

module.exports = { checkIfAuthenticated, checkIfAdmin, cacheData, redisClient }
