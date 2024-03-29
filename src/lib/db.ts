import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './env'

const uri = env.MONGO_URI || ''
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const db = client.db('tax-calculator')
