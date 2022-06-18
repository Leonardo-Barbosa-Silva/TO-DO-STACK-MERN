const router = require('express').Router()
const { registerUser, loginUser, getMe } = require('../../Controllers/users.js')
const authMiddleware = require('../../Middlewares/auth.js')

// @desc Create user
// @route POST /api/v1/users
// @access Public
router.post('/register', registerUser)

// @desc Create user
// @route POST /api/v1/users
// @access Public
router.post('/login', loginUser)

// @desc Create user
// @route POST /api/v1/users
// @access Private
router.get('/me', authMiddleware, getMe)




module.exports = router