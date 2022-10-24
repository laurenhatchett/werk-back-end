import { Event } from "../models/event.js";
import { Profile } from "../models/profile.js"

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
  Event.find({})
  .then(events => {
    res.json(events)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function deleteEvent(req, res) {
  Event.findByIdAndDelete(req.params.id)
  .then(deletedEvent => {
    res.json(deletedEvent)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

// function update(req, res) {
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key]
//   }
//   Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
//   .then(updatedEvent => {
//     if (updatedEvent.owner.equals(req.user.profile)) {
//       console.log(updatedEvent.owner)
//       res.status(201).json(updatedEvent)
//     } else {
//       throw new Error('Not Authorized')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json(err)
//   }) 
// }

export {
  create,
  show,
  index,
  deleteEvent as delete,
  // update
}