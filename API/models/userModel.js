const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
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
    phone: {
        type: String, 
        trim: true, 
    },
    location: {
        type: String, 
        trim: true, 
    },
    status: { 
        type: String, 
        enum: {
            values: ['active', 'inactive'], 
            message: '{VALUE} is not supported', 
        }, 
        default: 'active'
    },
    verified: {
        type: Boolean, 
        default: false
    }, 
    verificationToken: { type: String },
    verificationTokenValidation: {type: Date}, 
    deleted: {
        type: Boolean, 
        default: false
    }, 
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)
