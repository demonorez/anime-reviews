import { Router } from 'express'
import * as animeCtrl from '../controllers/anime.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', animeCtrl.index)

router.get('/new', isLoggedIn, animeCtrl.new)

router.get('/:id', animeCtrl.show)

router.get('/:id/edit', isLoggedIn, animeCtrl.edit)

router.get('/:animeId/reviews/:reviewId/edit', isLoggedIn, animeCtrl.editReview)

router.post('/', isLoggedIn, animeCtrl.create)

router.post('/:id/reviews', isLoggedIn, animeCtrl.createReview)

router.post('/:id/performers', isLoggedIn, animeCtrl.addToCast)

router.put('/:id', isLoggedIn, animeCtrl.update)

router.put('/:animeId/reviews/:reviewId', isLoggedIn, animeCtrl.updateReview)

router.delete('/:id', isLoggedIn, animeCtrl.delete)

router.delete('/:animeId/reviews/:reviewId', isLoggedIn, animeCtrl.deleteReview)

export {
  router
}