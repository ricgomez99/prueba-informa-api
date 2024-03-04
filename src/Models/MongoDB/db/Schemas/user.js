import pkg from 'mongoose'
const { Schema, model, models } = pkg

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
})

const User = models.User ?? model('User', userSchema)
export default User
