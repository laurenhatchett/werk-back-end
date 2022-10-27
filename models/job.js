import mongoose from 'mongoose'

const Schema = mongoose.Schema

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  jobDetails: {
    type: String,
    required: true,
  },
  skills: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

export { Job }
