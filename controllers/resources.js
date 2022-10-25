import { Profile } from "../models/profile.js"
import { Resource } from "../models/resource.js"


function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  req.body.owner = req.user.profile
  Resource.create(req.body)
  .then(resource => {
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
  .populate('owner')
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
  Resource.findById(req.params.id)
  .then(updatedResource => {
      if (updatedResource.owner._id.equals(req.user.profile)){ 
        for (let key in req.body) {
          updatedResource[key] = req.body[key]
        }
        updatedResource.save()
        console.log ('This is updated Resource', updatedResource)
        res.status(201).json(updatedResource)
  } else 
    res.status(401).json ({err:'Not Authorized'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}



function deleteResource(req, res) {
  Resource.findById(req.params.id)
  .then(deletedResource => {
    if (deletedResource.owner._id.equals(req.user.profile)) {
      deletedResource.deleteOne()
      res.status(200).json(deletedResource)
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
  create,
  index,
  show,
  updateResource,
  deleteResource,
}