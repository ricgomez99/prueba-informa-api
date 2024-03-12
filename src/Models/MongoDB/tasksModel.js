import { createConnection } from './db/connection.js'
import Task from './db/Schemas/task.js'
import 'dotenv/config.js'
import User from './db/Schemas/user.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(`error: ${error}`))

export class TasksModel {
  static async getTasks(userId) {
    try {
      const tasks = await Task.find({ user: userId })

      if (!tasks) {
        return []
      }
      return tasks
    } catch (error) {
      throw new Error(`No tasks found, error: ${error}`)
    }
  }

  static async getTaskById({ id }) {
    try {
      const task = await Task.findById(id)
      if (!id || !task) return null
      return task
    } catch (error) {
      throw new Error(`Task not found, error: ${error}`)
    }
  }

  static async createTask({ input, userId }) {
    try {
      const { title, creationDate } = input

      const newTask = new Task({
        title: title,
        creationDate: creationDate,
        user: userId,
      })

      const result = await Task.create(newTask)
      if (result) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { tasks: result._id } }
        )
      }
      return result
    } catch (error) {
      throw new Error(`Unable to create the task, error: ${error}`)
    }
  }

  static async deleteTask({ id }) {
    try {
      if (!id) return false
      await Task.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(`Unable to delete task, error: ${err}`)
    }
  }

  static async updateTask({ id, formData }) {
    try {
      if (!id || !formData) {
        return false
      }
      const result = await Task.findByIdAndUpdate(id, formData)
      return result
    } catch (error) {
      throw new Error(`Unable to update data, error: ${error}`)
    }
  }
}
