import { Router } from 'express'
import * as animeCtrl from '../controllers/anime.js'

const router = Router()

router.get('/', animeCtrl.index)

router.get('/new', animeCtrl.new)

router.post('/', animeCtrl.create)

export {
  router
}