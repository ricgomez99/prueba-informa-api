import { jwtAuth } from '../Utils/jwtAuth.js'

export class UsersController {
  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  getAll = async (req, res) => {
    const users = await this.usersModel.getUsers()
    res.status(200).json(users)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const user = await this.usersModel.getUserById({ id })

    if (user) {
      return res.status(200).json(user)
    }

    return res.status(400).json({ message: 'User not found' })
  }

  createUser = async (req, res) => {
    const input = req.body
    const result = await this.usersModel.createUser({ input })

    if (result) {
      return res.status(201).json({ message: 'User created', user: result })
    }

    return res.status(400).json({ message: 'Unable to create user' })
  }

  deleteUser = async (req, res) => {
    const { id } = req.body
    const result = await this.usersModel.deleteUser({ id })

    if (result) {
      return res.status(200).json({ message: 'User deleted!' })
    }

    return res.status(400).json({ message: 'Unable to delete user' })
  }

  login = async (req, res) => {
    const input = req.body
    const loginOutput = await this.usersModel.login({ input })

    if (loginOutput) {
      const loggedUser = jwtAuth({ user: loginOutput })
      return res.status(200).json({
        message: 'User logged-in successfully',
        access_code: loggedUser,
      })
    }

    return res.status(500).json({ message: 'User not allowed to login' })
  }
}
