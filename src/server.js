import { createApp } from '../app.js'
import { TasksModel } from './Models/MongoDB/tasksModel.js'
import { UsersModel } from './Models/MongoDB/usersModel.js'

createApp({ tasksModel: TasksModel, usersModel: UsersModel })
