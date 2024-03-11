import { Router } from 'express'
import { LogoutController } from '../Controllers/logoutController.js'

export const createLogoutRouter = ({ logoutModel }) => {
  const logoutController = new LogoutController({ logoutModel })
  const logoutRouter = Router()

  logoutRouter.delete('/', logoutController.logout)

  return logoutRouter
}
