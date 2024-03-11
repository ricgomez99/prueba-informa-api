import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { tokenGenerator } from './tokenGenerator.js'

export const jwtAuth = ({ user }) => {
  const accessToken = tokenGenerator({ userId: user._id })

  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN)

  return { accessToken, refreshToken }
}
