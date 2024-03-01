import express, { json } from 'express'
import 'dotenv/config'
import { corsMiddleware } from './src/Middlewares/cors.js'
import { createTaskRouter } from './src/Routes/tasks.js'

export const createApp = ({ tasksModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? '3000'

  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware())

  app.get('/', (req, res) => {
    const { name } = req.query
    name
      ? res.json({ message: `Hello, ${name} and welcome!` })
      : res.json({ message: `Hello, World!` })
  })

  app.use('/tasks', createTaskRouter({ tasksModel }))

  app.listen(PORT, () => {
    console.log(`app listening on port: http://localhost:${PORT}`)
  })

  return app
}
