import { Router } from 'express'
import { TasksController } from '../Controllers/tasksController.js'

export const createTaskRouter = ({ tasksModel }) => {
  const tasksRouter = Router()
  const tasksController = new TasksController({ tasksModel })

  tasksRouter.get('/', tasksController.getAll)
  tasksRouter.get('/:id', tasksController.getById)
  tasksRouter.post('/', tasksController.createTask)
  tasksRouter.delete('/:id', tasksController.deleteTask)
  tasksRouter.patch('/:id', tasksController.updateTask)

  return tasksRouter
}
