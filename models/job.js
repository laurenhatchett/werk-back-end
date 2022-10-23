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
  resume: String,
  coverLetter: String,
  jobDetails: String,
  skills: String,
  private: Boolean,
}, {
  timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

export { Job }
