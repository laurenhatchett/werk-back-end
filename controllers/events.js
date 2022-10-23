import { Event } from "../models/event.js";
import { Profile } from "../models/profile.js";

// const create = async (req, res) => {
//   try {
//     req.body.author = req.user.profile
//     const event = await Event.create(req.body)
//     const profile = await Profile.findByIdAndUpdate(
//       req.user.profile,
//       { $push: { events: event} },
//       { new: true }
//     )
//     event.author = profile
//     res.status(201).json(event)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }
// }

export {
  // create
}