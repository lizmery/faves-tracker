import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createTracker, updateTracker, deleteTracker, getTrackers, getTrackersOverview } from '../controllers/tracker.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createTracker)
router.put('/update/:trackerId/:userId', verifyToken, updateTracker)
router.delete('/delete/:trackerId/:userId', verifyToken, deleteTracker)
router.get('/get-trackers', getTrackers)
router.get('/get-trackers-overview', getTrackersOverview)

export default router