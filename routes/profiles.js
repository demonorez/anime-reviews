import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profileCtrl.index)

router.get('/:id', isLoggedIn, profileCtrl.show)

export {
  router
}