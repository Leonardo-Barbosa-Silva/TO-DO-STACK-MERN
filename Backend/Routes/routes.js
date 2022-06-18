const router = require('express').Router()
const goalsRoutes = require('./Goals/goalsRoutes.js')
const usersRoutes = require('./Users/usersRoutes.js')

// Goals Route
router.use('/api/v1/goals', goalsRoutes)

// Users Route
router.use('/api/v1/users', usersRoutes)





module.exports = router