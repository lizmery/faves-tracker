import multer from 'multer'

// configure multer to store files in multer's memory
const storage = multer.memoryStorage()

export const upload = multer({ storage }).single('csvFile')