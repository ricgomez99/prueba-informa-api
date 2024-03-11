import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const tokenGenerator = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: '30s',
  })
}
