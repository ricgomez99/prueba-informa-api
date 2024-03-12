import User from './db/Schemas/user.js'
import Token from './db/Schemas/tokens.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import { comparePassword } from '../../Utils/comparePassword.js'
import { createConnection } from './db/connection.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(`error: ${error}`))

export class LoginModel {
  static async login({ input }) {
    try {
      const user = await User.findOne({ username: input.username })
      const passwordMatch = await comparePassword(input.password, user.password)

      if (!user) {
        return null
      }

      if (passwordMatch) {
        return user
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`User not allowed to login, error: ${error}`)
    }
  }

  static async refresh(refreshToken) {
    try {
      if (!refreshToken) return null

      const registeredToken = await Token.findOne({ refresh: refreshToken })
      const { refresh } = registeredToken

      const decoded = jwt.verify(refresh, process.env.REFRESH_TOKEN)
      const userId = decoded.userId

      return userId
    } catch (error) {
      throw new Error(`Error refresing token, error: ${error}`)
    }
  }
}
