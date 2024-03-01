import pkg from 'mongoose'

const { Schema, model, models } = pkg
const currentDate = new Date().toLocaleString()

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  creationDate: {
    type: String,
    default: currentDate,
  },
})

const Task = models.Task ?? model('Task', taskSchema)
export default Task
