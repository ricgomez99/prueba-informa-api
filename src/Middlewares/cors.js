import cors from 'cors'

const ACCEPT_ORIGIN = [
  '*',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5173/auth/login',
  'https://prueba-informa-api-production.up.railway.app',
  'https://prueba-informa-api-production.up.railway.app/auth/login',
  'https://prueba-informa-api-production.up.railway.app/tasks',
]

export const corsMiddleware = ({ acceptOrigin = ACCEPT_ORIGIN } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptOrigin.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
