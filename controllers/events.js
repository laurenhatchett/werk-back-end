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

function update (req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Resource.findById(req.params.id)
  .then(updatedEvent => {
      if (updatedEvent.owner._id.equals(req.user.profile)){ 
        for (let key in req.body) {
          updatedEvent[key] = req.body[key]
        }
        updatedEvent.save()
        console.log ('This is the updated Event', updatedEvent)
        res.status(201).json(updatedEvent)
  } else 
    res.status(401).json ({err:'Not Authorized'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  show,
  index,
  deleteEvent as delete,
  update
}