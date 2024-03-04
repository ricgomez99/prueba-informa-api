import { Router } from 'express'
import { UsersController } from '../Controllers/usersController.js'

export const createLoginRouter = ({ usersModel }) => {
  const usersController = new UsersController({ usersModel })
  const loginRouter = Router()

  loginRouter.post('/', usersController.login)

  return loginRouter
}
