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
        subcategory: {
            type: String,
        },
        image: {
            type: String,
        },
        progress: {
            type: {
                current: { type: Number, default: 0 },
                total: { type: Number, default: 0 },
            },
            default: { current: 0, total: 0 },
        }
    },
    { timestamps: true }
)

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Tracker