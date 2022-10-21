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
    enum: []
  },
  skills: {
    type: String,
    required: true,
  },
  owner:[{type: Schema.Types.ObjectId, ref:'Profile'}],
  timestamps: true,

  }
) 