import express from 'express'
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    signout,
} from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId', updateUser)
router.delete('/delete/:userId', deleteUser)
router.get('/:userId', getUser)
router.get('/users', getAllUsers)
router.post('/signout', signout)

export default router