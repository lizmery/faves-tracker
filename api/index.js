import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import trackerRoutes from './routes/tracker.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDb is connected')
    })
    .catch((err) => {
        console.log(err)
    })

const __dirname = path.resolve()
const app = express()

app.use(cors({
    origin: ['https://mediatracker.vercel.app/', 'http://localhost:5173'],
    credentials: true, 
}))

app.use(express.json())
app.use(cookieParser())

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tracker', trackerRoutes)

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})