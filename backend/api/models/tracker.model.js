import mongoose from 'mongoose'

const trackerSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        genres: {
            type: Array,
            required: true,
        },
        status: {
            type: String,
        },
        by: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
        },
        dateStarted: {
            type: Date,
        },
        dateCompleted: {
            type: Date,
        },
        tags: {
            type: Array,
        },
        notes: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
)

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Tracker