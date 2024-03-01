import { createConnection } from './db/connection.js'
import Task from './db/Schemas/task.js'

createConnection()
  .then(console.log('Connected to tasksDB'))
  .catch((error) => console.log(error))

export class TasksModel {
  static async getTasks() {
    try {
      const tasks = await Task.find({})

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

  static async createTask({ input }) {
    try {
      const newTask = await Task.create(input)
      return newTask
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
