import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema)

export { Event }