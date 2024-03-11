import { Router } from 'express'
import { LoginController } from '../Controllers/loginController.js'

export const createRefreshRouter = ({ loginModel }) => {
  const loginController = new LoginController({ loginModel })
  const refreshRouter = Router()

  refreshRouter.post('/', loginController.refresh)

  return refreshRouter
}
