import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import User from '../models/user.model.js'

// update user
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'))
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters long'))
        }

        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    //TODO: add email validation

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        )

        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

// delete user
export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return nexr(errorHandler(403, 'You are not allowed to delete this user'))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}

// get all users
export const getAllUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'This action is not allowed'))
    }

    // try {
    //     const startIndex = parse
    // }
}

// get user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return next(errorHandler(404, 'User not found'))
        }

        const { password, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

// sign out
export const signout = (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out')
    } catch (error) {
        next(error)
    }
}