export class LogoutController {
  constructor({ logoutModel }) {
    this.logoutModel = logoutModel
  }

  logout = async (req, res) => {
    const { token } = req.body
    try {
      const result = await this.logoutModel.logout(token)
      if (!result) {
        return res.status(404).json({ message: 'Token does not exists' })
      }
      return res.status(201).json({ message: 'Token Deleted' })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete token' })
    }
  }
}
