import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createTracker, updateTracker } from '../controllers/tracker.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createTracker)
router.put('/update/:trackerId/:userId', verifyToken, updateTracker)

export default router