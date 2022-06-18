const jwt = require('jsonwebtoken')
const userModel = require('../Models/user.js')

module.exports = (req, res, next) => {
    const headerAuth = req.headers.authorization

    if (!headerAuth) {
        return res.status(401).json({ error: 'No token provided' })
    }

    const parts = headerAuth.split(' ')

    if (!parts.length === 2) {
        return res.status(401).json({ error: 'Token error' })
    }

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted' })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: 'Token invalid' })
        }

        req.user = decoded.userId

        next()
    })
}