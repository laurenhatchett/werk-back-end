import { Event } from "../models/event.js";

const create = async (req, res) => {
  for (let key in req.body) {
    if (req.body[key] ==='') delete req.body[key]
  }
  Event.create(req.body)
  .then(event => {
    res.status(201).json(event)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const show = async (req, res) => {
  Event.findById(req.params.id)
  .then(event => {
    res.json(event)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

const index = async (req, res) => {
  Event.find({})
  .then(events => {
    res.json(events)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

export {
  create,
  show,
  index,
}