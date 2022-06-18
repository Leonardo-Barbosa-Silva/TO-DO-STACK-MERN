const goalModel = require('../Models/goal.js')
const userModel = require('../Models/user.js')

module.exports = {

    async getGoals(req, res) {
        try {
            // Get goals of the user logged
            const goals = await goalModel.find({ user: req.user })

            res.status(200).json({
                message: 'Successfully GET goals',
                item: goals
            })
            
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async setGoal(req, res) {
        try {
            if (!req.body.text) {
                res.status(400).json({ error: 'Please add some text field.' })
                return
            }

            const createdGoal = await goalModel.create({
                user: req.user,
                text: req.body.text
            })
    
            res.status(201).json({
                message: 'Successfully POST goal',
                item: createdGoal
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async updateGoal(req, res) {
        try {
            // Check goal by the id passed in the params of req
            const goal = await goalModel.findById(req.params.id)

            if (!goal) {
                res.status(400).json({ error: 'Goal not found'})
                return
            }

            // Check the user who wants to update goal is the own of the goal
            const user = await userModel.findById(req.user).select('-password')

            if (!user) {
                res.status(404).json({ error: 'User not logged' })
            }

            if(goal.user.toString() !== user.id) {
                res.status(401).json({ error: 'Unauthorized user' })
                return
            }

            // Update goal
            const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

            res.status(200).json({
                message: 'Successfully UPDATE goal',
                item: updatedGoal
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async deleteGoal(req, res) {
        const id = req.params.id
        try {
            const goal = await goalModel.findById(id)

            if (!goal) {
                res.status(400).json({ error: 'Goal not found'})
                return
            }

            // Check the user who wants to delete goal is the own of the goal
            const user = await userModel.findById(req.user).select('-password')

            if (!user) {
                res.status(404).json({ error: 'User not logged' })
            }
            
            if(goal.user.toString() !== user.id) {
                res.status(401).json({ error: 'Unauthorized user' })
                return
            }

            await goal.remove()

            res.status(200).json({
                message: 'Successfully DELETE goal',
                item: id
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
}