import Tracker from '../models/tracker.model.js'
import { errorHandler } from '../utils/error.js'

export const createTracker = async (req, res, next) => {
    if (!req.body.title || !req.body.genres || !req.body.category || !req.body.type) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }

    const genresArr = req.body.genres.split(',')
    const tagsArr = req.body.tags.split(',')

    const newTracker = new Tracker({
        ...req.body,
        userId: req.user.id,
        genres: genresArr,
        tags: tagsArr,
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

    const genresArr = req.body.genres.split(',')
    const tagsArr = req.body.tags.split(',')

    try {
        const updatedTracker = await Tracker.findByIdAndUpdate(
            req.params.trackerId,
            {
                $set: {
                    title: req.body.title,
                    genres: genresArr,
                    status: req.body.status,
                    by: req.body.by,
                    rating: req.body.rating,
                    dateStarted: req.body.dateStarted,
                    dateCompleted: req.body.dateCompleted,
                    tags: tagsArr,
                    notes: req.body.notes,
                    category: req.body.category,
                    type: req.body.type,
                    image: req.body.image,
                },
            },
            { new: true }
        )

        res.status(200).json(updatedTracker)
    } catch (error) {
        next(error)
    }
}

export const deleteTracker = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allow to delete this tracker'))
    }

    try {
        await Tracker.findByIdAndDelete(req.params.trackerId)
        res.status(200).json('Tracker has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getTrackers = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 10
        const sortDirection = req.query.order === 'asc' ? 1 : -1
        const trackers = await Tracker.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.type && { type: req.query.type }),
            ...(req.query.status && { status: req.query.status }),
            ...(req.query.trackerId && { _id: req.query.trackerId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { tags: { $regex: req.query.searchTerm, $options: 'i' } },
                    { type: { $regex: req.query.searchTerm, $options: 'i' } },
                    { category: { $regex: req.query.searchTerm, $options: 'i' } },
                    { by: { $regex: req.query.searchTerm, $options: 'i' } },
                    { genres: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ dateStarted: sortDirection })
            .skip(startIndex)
            .limit(limit)

        const totalTrackers = await Tracker.countDocuments()
        const totalCompleted = await Tracker.find({
            status: 'Completed',
            ...(req.query.category && { category: req.query.category }),
        }).countDocuments()
        const totalInProgress = await Tracker.find({
            status: 'In Progress',
            ...(req.query.category && { category: req.query.category }),
        }).countDocuments()
        const totalNotStarted = await Tracker.find({
            status: 'Not Started',
            ...(req.query.category && { category: req.query.category }),
        }).countDocuments()

        res.status(200).json({
            trackers,
            totalTrackers,
            totalCompleted,
            totalInProgress,
            totalNotStarted,
        })
    } catch (error) {
        next(error)
    }
}

export const getTrackersOverview = async (req, res, next) => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    try {
        const completedTrackersByCategory = await Tracker.aggregate([
            {
                $match: { 
                    userId: req.query.userId,
                    status: 'Completed',
                },
            },
            {
                $group: {
                    _id: '$category',
                    totalCompleted: { $sum: 1 },
                },
            },
        ])

        const popularGenresCompleted = await Tracker.aggregate([
            {
                $match: {
                    userId: req.query.userId,
                    status: 'Completed', 
                },
            },
            {
                $unwind: '$genres',
            },
            {
                $group: {
                    _id: '$genres',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ])

        const userActivity = await Tracker.aggregate([
            {
                $match: {
                    userId: req.query.userId,
                    createdAt: { $gte: sixMonthsAgo },
                },
            },
            {
                $group: {
                    _id: { 
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                        category: '$category', 
                        status: '$status' 
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1},
            },
        ])

        const recentTrackers = await Tracker.find()
            .sort({ createdAt: -1 })
            .limit(5)

        const trackers = await Tracker.find({
            ...(req.query.userId && { userId: req.query.userId }),
        })

        res.status(200).json({
            completedTrackersByCategory,
            popularGenresCompleted,
            userActivity,
            trackers,
            recentTrackers,
        })
    } catch (error) {
        next(error)
    }
}