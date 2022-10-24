import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

const createLog = async (req, res) => {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.myLogs.push(req.body)
    profile.save()
    res.json(profile)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

export { 
  index, 
  addPhoto, 
  createLog,
}
