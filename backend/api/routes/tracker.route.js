import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createTracker } from '../controllers/tracker.controller.js'

const router = express.Router()

router.post('/createTracker', verifyToken, createTracker)

export default router