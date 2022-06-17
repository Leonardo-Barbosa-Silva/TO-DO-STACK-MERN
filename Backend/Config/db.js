const mongoose = require('mongoose')

const connectionDB = mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log(`Successfully connected to MongoDB`.cyan.underline)
    })
    .catch ( (error) => {
        console.log(`${error.message}`.red.underline)
    })




module.exports = connectionDB