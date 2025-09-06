const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name is required'], 
        trim: true
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required'], 
        trim: true, 
        lowercase: true, 
        unique:  [true, 'Email must be unique'], 
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required'], 
        trim: true, 
        select: false
    }, 
    role: { 
        type: String, 
        enum: {
            values: ['Admin', 'Pharmacist'], 
            message: '{VALUE} is not supported', 
        }, 
        default: 'Pharmacist'
    },
    verified: {
        type: Boolean, 
        default: false
    }, 
    verificationToken: { type: String },
    verificationTokenValidation: {type: Date}
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)
