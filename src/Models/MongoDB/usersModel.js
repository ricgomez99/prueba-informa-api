import { createConnection } from './db/connection.js'
import User from './db/Schemas/user.js'
import { saltGenerator } from '../../Utils/saltGenerator.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(`error: ${error}`))

export class UsersModel {
  static async getUsers() {
    try {
      const users = await User.find().populate('tasks')
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
      const { username, email, password } = input
      const encryptPassword = await saltGenerator(password)
      const user = {
        username: username,
        email: email,
        password: encryptPassword,
      }
      const result = await User.create(user)
      if (!result) return null

      return result
    } catch (error) {
      throw new Error(`Error while creting a user, error: ${error}`)
    }
  }

  static async deleteUser({ id }) {
    try {
      const result = await User.findByIdAndDelete(id)
      if (!result) {
        return null
      }

      return result
    } catch (error) {
      throw new Error(`Unable to delete user, error: ${error}`)
    }
  }
}
