import Tracker from '../models/tracker.model'
import { errorHandler } from '../utils/error.js'

export const createTracker = async (req, res, next) => {
    if (!req.body.title || !req.body.genre || !req.body.category) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }

    const newTracker = new Tracker({
        ...req.body,
        userId: req.user.id,
    })

    try {
        const savedTracker = await newTracker.save()
        res.status(201).json(savedTracker)
    } catch (error) {
        next(error)
    }
}