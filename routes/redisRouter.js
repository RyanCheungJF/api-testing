const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
const { cacheData, redisClient } = require('../middleware/middleware')

app.get('/persons', cacheData, async (_, res) => {
  console.log('Request for persons data sent to local database')
  const uri = 'mongodb://localhost:27017'
  const client = new MongoClient(uri)
  let data
  const run = async () => {
    try {
      await client.connect()
      const db = client.db('taske')
      const collection = db.collection('people')
      const cursor = collection.find()
      data = await cursor.toArray()
    } finally {
      await client.close()
    }
  }
  await run().catch((err) => {
    console.log(err)
    return res
      .status(400)
      .send({ message: 'Failed to read from local MongoDB' })
  })
  if (!data) {
    return res.status(400).send({ message: 'Failed to fetch persons data' })
  }
  try {
    await redisClient.set('persons', JSON.stringify(data), {
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
