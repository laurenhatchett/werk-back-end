import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// router.get('/', checkAuth, eventsCtrl.index)
router.get('/:id', checkAuth, eventsCtrl.show)
// router.put('/:id', checkAuth, eventsCtrl.update)
router.post('/', checkAuth, eventsCtrl.create)
// router.delete('/:id', checkAuth, eventsCtrl.delete)

export { router }