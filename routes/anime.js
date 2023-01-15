import { Router } from 'express'
import * as animeCtrl from '../controllers/anime.js'

const router = Router()

router.get('/', animeCtrl.index)

router.get('/new', animeCtrl.new)

router.get('/:id', animeCtrl.show)

router.post('/', animeCtrl.create)

export {
  router
}