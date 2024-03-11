import { createConnection } from './db/connection.js'
import Token from './db/Schemas/tokens.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(`error: ${error}`))

export class LogoutModel {
  static async logout(token) {
    try {
      if (!token) return null
      const deletedToken = await Token.findOneAndDelete({ refresh: token })

      return deletedToken
    } catch (error) {
      throw new Error(`Failed to logout: ${error}`)
    }
  }
}
