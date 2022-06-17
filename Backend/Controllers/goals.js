const goalModel = require('../Models/goal.js')

module.exports = {

    async getGoals(req, res) {
        try {
            const goals = await goalModel.find()

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
            const goal = await goalModel.find({ id: req.params.id })

            if (!goal) {
                res.status(400).json({ error: 'Goal not found'})
            }

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