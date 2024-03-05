import { Router } from 'express'
import { TasksController } from '../Controllers/tasksController.js'
import { authenticateToken } from '../Middlewares/authenticateToken.js'

export const createTaskRouter = ({ tasksModel }) => {
  const tasksRouter = Router()
  const tasksController = new TasksController({ tasksModel })

  tasksRouter.get('/', authenticateToken, tasksController.getAll)
  tasksRouter.get('/:id', authenticateToken, tasksController.getById)
  tasksRouter.post('/', authenticateToken, tasksController.createTask)
  tasksRouter.delete('/:id', authenticateToken, tasksController.deleteTask)
  tasksRouter.patch('/:id', authenticateToken, tasksController.updateTask)

  return tasksRouter
}
