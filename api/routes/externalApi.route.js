import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { searchAnime } from '../controllers/externalApi.controller.js'

const router = express.Router()

router.get('/anime', searchAnime)

export default router