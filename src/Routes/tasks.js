import { Router } from 'express'
import { TasksController } from '../Controllers/tasksController.js'

export const createTaskRouter = ({ tasksModel }) => {
  const tasksRouter = Router()
  const tasksController = new TasksController({ tasksModel })

  tasksRouter.get('/', tasksController.getAll)
  tasksRouter.post('/', tasksController.createTask)

  return tasksRouter
}
