import { jwtAuth } from '../Utils/jwtAuth.js'
import Token from '../Models/MongoDB/db/Schemas/tokens.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import { tokenGenerator } from '../Utils/tokenGenerator.js'

export class LoginController {
  constructor({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const input = req.body
    const loginOutput = await this.loginModel.login({ input })

    if (loginOutput) {
      const { accessToken: loggedUser, refreshToken } = jwtAuth({
        user: loginOutput,
      })

      await Token.create({ refresh: refreshToken })

      return res.status(200).json({
        message: 'User logged-in successfully',
        access_code: loggedUser,
        refresh_code: refreshToken,
      })
    }
  }

  refresh = async (req, res) => {
    const refreshToken = req.body.token

    try {
      const userId = await this.loginModel.refresh(refreshToken)

      if (!userId) {
        return res.status(401).json({ message: 'No token returned' })
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err)
          return res.status(403).json({ message: 'Invalid refresh token' })

        const accessToken = tokenGenerator({ userId })
        res.json({ accessToken: accessToken })
      })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to refresh token' })
    }
  }
}
