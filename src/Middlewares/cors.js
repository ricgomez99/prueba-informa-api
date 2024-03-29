import cors from 'cors'

const ACCEPT_ORIGIN = [
  '*',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5173/',
  'http://localhost:5173/',
  'http://localhost:5173/auth/login',
  'https://prueba-informa-api-production.up.railway.app',
  'https://prueba-informa-api-production.up.railway.app/auth/login',
  'https://prueba-informa-api-production.up.railway.app/tasks',
  'https://prueba-informa-api-production.up.railway.app/token',
]

export const corsMiddleware = ({ acceptOrigin = ACCEPT_ORIGIN } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptOrigin.indexOf(origin) !== -1 || !origin) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
  })
