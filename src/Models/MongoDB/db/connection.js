import mongoose from 'mongoose'
import 'dotenv/config'

const DB_URI = process.env.DB_URI

export const createConnection = async () => await mongoose.connect(DB_URI)
