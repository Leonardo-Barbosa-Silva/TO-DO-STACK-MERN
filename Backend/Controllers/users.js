const userModel = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function generateToken (userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '120d'
    })
}

module.exports = {

    async registerUser(req, res) {
        const { name, email, password } = req.body
        try {
            if (!name || !email || !password) {
                res.status(400).json({ error: 'Please add all required fields' })
            }

            const userExists = await userModel.findOne({ email: email })

            if (userExists) {
                res.status(400).json({ error: 'User with email already exist' })
                return
            }

            // Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Create User
            const createdUser = await userModel.create({
                name,
                email,
                password: hashedPassword
            })

            if (!createdUser) {
                res.status(400).json({ error: 'Invalid user data' })
            }

            res.status(200).json({
                message: 'Successfully register user',
                item: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email,
                    token: generateToken(createdUser._id)
                }
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const loggedUser = await userModel.findOne({ email })

            if (!loggedUser) {
                res.status(404).json({ error: 'User not found.'})
            }

            if (loggedUser && (await bcrypt.compare(password, loggedUser.password))) {
                res.status(200).json({
                    message: 'Successfully login user',
                    item: {
                        id: loggedUser.id,
                        name: loggedUser.name,
                        email: loggedUser.email,
                        token: generateToken(loggedUser._id)
                    }
                })
            } else {
                res.status(400).json({ error: 'Invalid credentials' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async getMe(req, res) {
        const { _id, name, email } = await userModel.findById(req.user).select('-password')

        res.status(200).json({
            message: 'Successfully GET me',
            item: {
                id: _id,
                name,
                email
            }
        })
    }

}