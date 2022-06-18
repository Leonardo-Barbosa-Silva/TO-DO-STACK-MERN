const router = require('express').Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../../Controllers/goals.js')
const authMiddleware = require('../../Middlewares/auth.js')

// @desc Find goals
// @route GET /api/v1/goals
// @access Private
router.get('/', authMiddleware, getGoals)

// @desc Create goals
// @route POST /api/v1/goals
// @access Private
router.post('/', authMiddleware, setGoal)

// @desc Modify goals
// @route PUT /api/v1/goals/:id
// @access Private
router.put('/:id', authMiddleware, updateGoal)

// @desc Delete goals
// @route GET /api/v1/goals/:id
// @access Private
router.delete('/:id', authMiddleware, deleteGoal)





module.exports = router