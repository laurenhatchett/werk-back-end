import { Profile } from "../models/profile.js"
import { Job } from "../models/job.js"

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  req.body.owner = req.user.profile
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
  .populate('owner')
  .then(job => {
    res.status(200).json(job)
  }) 
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
}

function update(req, res) {
  console.log('REQ.BODY', req.body)
  console.log('REQ.PARAMS.ID', req.params.id);
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedJob => {
    if (updatedJob.owner.equals(req.user.profile)) {
      console.log(updatedJob.owner)
      res.status(201).json(updatedJob)
    } else {
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
}

function deleteJob(req, res) {
  Job.findByIdAndDelete(req.params.id)
  .then(deletedJob => {
    if (deletedJob.owner.equals(req.user.profile)) {
      res.status(200).json(deletedJob)
    } else {
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
}

export {
  index,
  create,
  show,
  update,
  deleteJob,
}