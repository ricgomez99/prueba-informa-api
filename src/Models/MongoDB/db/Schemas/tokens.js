import pkg from 'mongoose'

const { Schema, models, model } = pkg

const tokensSchema = new Schema({
  refresh: {
    type: String,
    unique: true,
  },
})

const Token = models.Token ?? model('Token', tokensSchema)
export default Token
