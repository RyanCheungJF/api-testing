const express = require('express')
const axios = require('axios')
const app = express()
const { cacheData, redisClient } = require('../middleware/middleware')

app.get('/fishes', cacheData, async (_, res) => {
  console.log('Request for fish data sent to API server')
  const apiRes = await axios.get('https://www.fishwatch.gov/api/species')
  if (!apiRes) {
    return res.status(400).send({ message: 'Failed to fetch fish data' })
  }
  const data = apiRes.data
  try {
    await redisClient.set('fish', JSON.stringify(data), {
      EX: 30,
      NX: true,
    })
    return res.status(200).send({
      fromCache: false,
      data: data,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ message: 'Failed to save in redis!' })
  }
})

module.exports = app
