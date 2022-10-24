import { Router } from 'express'
import * as resourcesCtrl from '../controllers/resources.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, resourcesCtrl.index)
router.get('/:id', checkAuth, resourcesCtrl.show)
router.put('/:id', checkAuth, resourcesCtrl.update)
router.post('/', checkAuth, resourcesCtrl.create)
//router.delete('/:id', checkAuth, blogsCtrl.delete)

export { router }