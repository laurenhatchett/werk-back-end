import mongoose from 'mongoose'

const Schema = mongoose.Schema

const myLogSchema = new Schema ({
  date: {
    type: Date,
  },
  logEntry: {
    type: String,
  },
  skills: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  photo: String,
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  myLogs: [myLogSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
