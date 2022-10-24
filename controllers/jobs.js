import { Profile } from "../models/profile.js"
import { Job } from "../models/job.js"

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Job.create(req.body)
  .then(job => {
    Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { jobs: job } },
      { new: true }
    )
    res.status(201).json(job)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
}

function index(req, res) {
  Job.find({}).sort({ createdAt: 'desc' })
  .then(jobs => {
    res.status(200).json(jobs)
  })
  .catch (err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req, res) {
  Job.findById(req.params.id)
  .then(job => {
    res.status(200).json(job)
  }) 
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
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