import { Router } from 'express'
import * as animeCtrl from '../controllers/anime.js'

const router = Router()

router.get('/', animeCtrl.index)

router.get('/new', animeCtrl.new)

router.get('/:id', animeCtrl.show)

router.get('/:id/edit', animeCtrl.edit)

router.post('/', animeCtrl.create)

router.post('/:id/reviews', animeCtrl.createReview)

router.post('/:id/performers', animeCtrl.addToCast)

router.put('/:id', animeCtrl.update)

router.delete('/:id', animeCtrl.delete)
export {
  router
}