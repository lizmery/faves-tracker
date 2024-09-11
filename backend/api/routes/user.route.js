import express from 'express'
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    signout,
} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.get('/:userId', getUser)
router.get('/users', verifyToken, getAllUsers)
router.post('/signout', signout)

export default router