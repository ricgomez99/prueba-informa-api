import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(400)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: err })

    req.user = user
    next()
  })
}
