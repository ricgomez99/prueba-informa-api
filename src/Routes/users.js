import { Router } from 'express'
import { UsersController } from './../Controllers/usersController.js'

export const createUserRouter = ({ usersModel }) => {
  const usersController = new UsersController({ usersModel })
  const usersRouter = Router()

  usersRouter.get('/', usersController.getAll)
  usersRouter.get('/:id', usersController.getById)
  usersRouter.post('/', usersController.createUser)
  usersRouter.post('/:id', usersController.deleteUser)

  return usersRouter
}
