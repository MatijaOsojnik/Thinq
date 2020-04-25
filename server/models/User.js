const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    displayName: {
        type: String,
        required: [true, "Please include your Display Name"]
    },
    email: {
        type: String,
        required: [true, "Please include your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please include your password"],
    },
    registerDate: {
        type: Date,
        default: Date.now(),
    },
    token: [
        {
            token: {
                type: String,
                require: true,
            }
        }
    ]
})

const User = mongoose.model('User', UserSchema)
module.exports = User