import { createConnection } from './db/connection.js'
import Task from './db/Schemas/task.js'

createConnection()
  .then(console.log('Connected to tasksSB'))
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

  static async createTask({ input }) {
    try {
      const newTask = await Task.create(input)
      return newTask
    } catch (error) {
      throw new Error(`Unable to create the task, error: ${error}`)
    }
  }
}
