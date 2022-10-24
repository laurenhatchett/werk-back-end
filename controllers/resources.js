import { Profile } from "../models/profile.js"
import { Resource } from "../models/resource.js"


function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Resource.create(req.body)
  .then(resource => {
    req.body.owner = req.user.profile._id
    console.log(resource.owner)
    res. status(201).json(resource)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function index(req, res) {
  Resource.find({})
  .then(resources => {
    res.json(resources)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function show(req, res) {
  Resource.findById(req.params.id)
  .then(resource => {
    res.json(resource)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function updateResource(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Resource.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedResource => {
    res.json(updatedResource)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}






export {
  create,
  index,
  show,
  updateResource as update,
}