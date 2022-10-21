import mongoose from 'mongoose'

const Schema = mongoose.Schema

const resourceSchema = new Schema (
  {
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["book", "video", "interview tip", "blog", "article", "other"]
  },
  skills: {
    type: String,
    required: true,
  },
  owner:[{type: Schema.Types.ObjectId, ref:'Profile'}],
  timestamps: true,
  }
) 

const Resource = mongoose.model('Resource', resourceSchema)

export { Resource }