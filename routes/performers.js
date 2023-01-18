import { Router } from 'express'
import * as performersCtrl from '../controllers/performers.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', isLoggedIn, performersCtrl.new)

router.get('/:id/edit', isLoggedIn, performersCtrl.edit)

router.post('/', isLoggedIn, performersCtrl.create)

router.put('/:id', isLoggedIn, performersCtrl.update)

router.delete('/:id', isLoggedIn, performersCtrl.delete)

export {
  router
}