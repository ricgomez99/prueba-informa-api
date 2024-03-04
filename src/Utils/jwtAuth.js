import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const jwtAuth = ({ user }) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN)

  return accessToken
}
