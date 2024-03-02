import { createConnection } from './db/connection.js'
import User from './db/Schemas/user.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(`error: ${error}`))

export class UsersModel {
  static async getUsers() {
    try {
      const users = await User.find()
      if (!users) return []

      return users
    } catch (error) {
      throw new Error(`No Users found, error: ${error}`)
    }
  }

  static async getUserById({ id }) {
    try {
      const user = await User.findById(id)
      if (!user) return null

      return user
    } catch (error) {
      throw new Error(`Unable to find user, error: ${error}`)
    }
  }

  static async createUser({ input }) {
    try {
      const result = await User.create(input)
      if (!result) return null

      return result
    } catch (error) {
      throw new Error(`Error while creting a user, error: ${error}`)
    }
  }
}
