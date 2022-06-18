const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    text: {
        type: String,
        required: [true, 'Please add some text value']
    }
}, {
    timestamps: true
})

const goalModel = mongoose.model('Goals', goalSchema)





module.exports = goalModel