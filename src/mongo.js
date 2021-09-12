// @ts-check
require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = process.env.DB_URL
// @ts-ignore
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = client
