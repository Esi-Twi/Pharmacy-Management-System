const { registerSchema, loginSchema } = require('../middlewares/validator')
const User = require('../models/userModel')
const { doHash, doHashValidation } = require('../utils/hashing')
const jwt = require('jsonwebtoken')



exports.register = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        if (!name || !email || !password) {
            res.status(400).json({ success: false, msg: 'Name, Email and Password is required' })
        }

        const { error, value } = registerSchema.validate({ name, email, password })
        if (error) {
            res.status(400).json({ success: false, msg: error.details[0].message })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ success: false, msg: 'User already exists' })
        }

        const hashedPassword = await doHash(password, 12)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'Pharmacist'
        })
        await user.save()

        user.password = undefined
        res.status(200).json({ success: true, msg: `${user.role} is created successfully`, user: user })

    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Email and Password is required' })
        }

        const { error, value } = loginSchema.validate({ email, password })
        if (error) {
            return res.status(400).json({ success: false, msg: error.details[0].message })
        }

        const existingUser = await User.findOne({email}).select('+password')
        if(!existingUser ) {
            return res.status(400).json({ success: false, msg: 'User does not exists' })
        }
        
        // const inactiveUser = await User.findOne
        const deletedUser = await User.findOne({email, deleted: true})
        if(deletedUser) {
            return res.status(400).json({ success: false, msg: 'User does not exist deleted' })
        }

        const inactiveUser = await User.findOne({email, status: 'inactive'}) 
        if(inactiveUser) {
            return res.status(400).json({ success: false, msg: 'This account is inactive' })
        }

        const result = await doHashValidation(password, existingUser.password)
        if(!result) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' })
        }

        const token = jwt.sign({
            userId: existingUser._id, 
            email: existingUser.email, 
            role: existingUser.role,
            verified: existingUser.verified
        }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        })
        existingUser.password = undefined

        return res.cookie('Authorization', 'Bearer ' + token, {
            expiresIn: new Date(Date.now() + 8 * 3600000), 
            httpOnly: process.env.NODE_ENV == 'production', 
            secure: false,
            // secure: process.env.NODE_ENV == 'production',
        }).json({success: true, token, user: existingUser, msg: 'logged in successfully!'})


    } catch (error) {
        return res.status(500).json({success: false, msg: 'Something went wrong', error: error.message})
    }

}

exports.logout = async (req, res) => {
    res.clearCookie('Authorization').status(200).json({success: true, msg: 'logged out successfully!'})
}



