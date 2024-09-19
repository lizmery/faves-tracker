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

export const updateTracker = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this tracker'))
    }

    try {
        const updatedTracker = await Tracker.findByIdAndUpdate(
            req.params.trackerId,
            {
                $set: {
                    title: req.body.title,
                    genre: req.body.genre,
                    status: req.body.status,
                    by: req.body.by,
                    rating: req.body.rating,
                    dateStarted: req.body.dateStarted,
                    dateCompleted: req.body.dateCompleted,
                    tags: req.body.tags,
                    notes: req.body.notes,
                    category: req.body.category,
                },
            },
            { new: true }
        )

        res.status(200).json(updatedTracker)
    } catch (error) {
        next(error)
    }
}