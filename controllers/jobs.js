import { Profile } from "../models/profile.js"
import { Job } from "../models/job.js"

const create = async (req, res) => {
  try {
    const job = await Job.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { jobs: job } },
      { new: true }
    )
    res.status(201).json(job)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const jobs = await Job.find({})
    .sort({ createdAt: 'desc' })
  res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {

}

const update = async (req, res) => {

}

const deleteJob = async (req, res) => {

}

export {
  index,
  create,
  show,
  update,
  deleteJob,
}