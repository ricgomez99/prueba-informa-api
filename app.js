import express, { json } from 'express'
import 'dotenv/config'
import { corsMiddleware } from './src/Middlewares/cors.js'
import { createTaskRouter } from './src/Routes/tasks.js'
import { createUserRouter } from './src/Routes/users.js'
import { createLoginRouter } from './src/Routes/login.js'
import { createRefreshRouter } from './src/Routes/refresh.js'
import { createLogoutRouter } from './src/Routes/logout.js'

export const createApp = ({
  tasksModel,
  usersModel,
  loginModel,
  logoutModel,
}) => {
  const app = express()
  const PORT = process.env.PORT ?? '3000'

  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware())
  app.options('*', corsMiddleware())

  app.get('/', (req, res) => {
    const { name } = req.query
    name
      ? res.json({ message: `Hello, ${name} and welcome!` })
      : res.json({ message: `Hello, World!` })
  })

  app.use('/tasks', createTaskRouter({ tasksModel }))
  app.use('/users', createUserRouter({ usersModel }))
  app.use('/auth/login', createLoginRouter({ loginModel }))
  app.use('/logout', createLogoutRouter({ logoutModel }))
  app.use('/token', createRefreshRouter({ loginModel }))

  app.listen(PORT, () => {
    console.log(`app listening on port: http://localhost:${PORT}`)
  })

  return app
}
