import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../Models/MongoDB/db/Schemas/user.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(400)

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
    const userId = decodedToken.userId
    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    req.userId = userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' })
  }
}
