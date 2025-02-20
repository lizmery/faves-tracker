import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { importCSV } from '../controllers/csv.controller.js'
import { upload } from '../middlewares/upload.js'

const router = express.Router()

router.post('/import', upload, importCSV)


export default router