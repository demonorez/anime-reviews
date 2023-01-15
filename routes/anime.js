import { Router } from 'express'
import * as animeCtrl from '../controllers/anime.js'

const router = Router()

router.get('/', animeCtrl.index)

router.get('/new', animeCtrl.new)

export {
  router
}