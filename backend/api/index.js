import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDb is connected')
    })
    .catch((err) => {
        console.log(err)
    })

const __dirname = path.resolve

const app = express()

app.use(express.json())
// app.use()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})

app.use('/api/auth', authRoutes)