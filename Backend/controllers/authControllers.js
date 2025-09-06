const User = require('../models/userModel')
const { doHash } = require('../utils/hashing')



exports.login = async(req,res) => {
    res.send('this is the login for dunon pharmacy')

}

exports.logout = async(req,res) => {
    res.send('this is the logout for dunon pharmacy')

}

exports.register = async(req,res) => {
    const { name, email, password, role } = req.body 

    try {
        if(!name || !email || !password) {
            res.status(400).json({success: false, msg: 'Name, Email and Password is required'})
        }

        //validate data using joi

        const existingUser = await User.findOne({email})
        if(existingUser) {
            res.status(400).json({success: false, msg: 'User already exists'})
        }

        const hashedPassword = await doHash(password, 12)

        const user = new User({
            name, 
            email, 
            password, 
            role: role || 'Pharmacist'
        })

        await user.save()
        
    } catch (error) {
        console.log(error);
    }
}