import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, jobsCtrl.index)
router.get('/:id', checkAuth, jobsCtrl.show)
router.put('/:id', checkAuth, jobsCtrl.update)
router.post('/', checkAuth, jobsCtrl.create)
// router.delete('/:id', checkAuth, blogsCtrl.delete)

export { router }