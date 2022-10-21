import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: String,
  date: Number,
  location: String,
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema)

export { Event }