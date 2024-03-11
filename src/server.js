import { createApp } from '../app.js'
import { TasksModel } from './Models/MongoDB/tasksModel.js'
import { UsersModel } from './Models/MongoDB/usersModel.js'
import { LoginModel } from './Models/MongoDB/loginModel.js'
import { LogoutModel } from './Models/MongoDB/logoutModel.js'

createApp({
  tasksModel: TasksModel,
  usersModel: UsersModel,
  loginModel: LoginModel,
  logoutModel: LogoutModel,
})
