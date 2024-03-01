import { createApp } from '../app.js'
import { TasksModel } from './Models/MongoDB/tasksModel.js'
createApp({ tasksModel: TasksModel })
