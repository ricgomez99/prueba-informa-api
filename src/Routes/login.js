import { Router } from 'express'
import { LoginController } from '../Controllers/loginController.js'

export const createLoginRouter = ({ loginModel }) => {
  const loginController = new LoginController({ loginModel })
  const loginRouter = Router()

  loginRouter.post('/', loginController.login)

  return loginRouter
}
