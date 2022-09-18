const admin = require('../firebase-config')

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

module.exports = { checkIfAuthenticated, checkIfAdmin }
