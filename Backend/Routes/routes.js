const router = require('express').Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../Controllers/goals.js')

// Goals routes
router.get('/api/v1/goals', getGoals)
router.post('/api/v1/goals', setGoal)
router.put('/api/v1/goals/:id', updateGoal)
router.delete('/api/v1/goals/:id', deleteGoal)






module.exports = router