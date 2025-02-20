import parseCSV from '../utils/csvParser.js'
import goodreadsParser from '../parsers/goodreadsParser.js'
import myanimelistParser from '../parsers/myanimelistParser.js'
import imdbParser from '../parsers/imdbParser.js'
import dynamicParser from '../parsers/dynamicParser.js'
import Tracker from '../models/tracker.model.js'

export const importCSV = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded')
        }

        const { site, userId, fieldMappings } = req.body
        if (!userId) {
            throw new Error('User ID is required')
        }

        const csvBuffer = req.file.buffer // access file from buffer in memory
        const csvData = await parseCSV(csvBuffer) // converts csv buffer to an array of objects

        let parsedData
        if (site === 'myanimelist') {
            parsedData = myanimelistParser(csvData)
        } else if (site === 'goodreads') {
            parsedData = goodreadsParser(csvData)
        } else if (site === 'imdb') {
            parsedData = imdbParser(csvData)
        } else if (site === 'other') {
            parsedData = dynamicParser(csvData, fieldMappings)
        } else {
            throw new Error('Unsupported site for CSV import.')
        }

        // add userId to each tracker
        const trackersWithUserId = parsedData.map((tracker) => ({
            ...tracker,
            userId,
        }))

        const savedTrackers = await Tracker.insertMany(trackersWithUserId)

        res.status(201).json({
            message: 'CSV data imported successfully!',
            data: parsedData,
        })
    } catch (error) {
        console.error('Error importing CSV: ', error)
        res.status(500).json({ error: 'Failed to import CSV data.' })
    }
}