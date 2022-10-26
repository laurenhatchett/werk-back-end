import { Event } from "../models/event.js";

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] ==='') delete req.body[key]
  }
  req.body.owner = req.user.profile
  Event.create(req.body)
  .then(event => {
    res.status(201).json(event)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req, res) {
  Event.findById(req.params.id)
  .populate("owner")
  .then(event => {
    res.json(event)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function index(req, res) {
  Event.find({}).sort({ createdAt: 'desc' })
  .then(events => {
    res.status(200).json(events)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function deleteEvent(req, res) {
  Event.findByIdAndDelete(req.params.id)
  .then(deletedEvent => {
    if (deletedEvent.owner.equals(req.user.profile)) {
      res.status(200).json(deletedEvent)
    } else {
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function update(req, res) {
  console.log('BBBBBBBB', req.body)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedEvent => {
    if (updatedEvent.owner.equals(req.user.profile)) {
      console.log('UPDATED EVENT OWNER', updatedEvent.owner)
    } else {
      throw new Error('Not Authorized')
    }
    res.json(updatedEvent)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  }) 
}

export {
  create,
  show,
  index,
  deleteEvent as delete,
  update
}