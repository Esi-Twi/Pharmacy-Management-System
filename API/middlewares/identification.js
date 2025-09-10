const jwt = require('jsonwebtoken')

exports.identifier = async (req, res, next) => {
    let token

    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization
    } else {
        token = req.cookies['Authorization']
    }

    if (!token) {
        return res.status(400).json({ success: false, msg: 'Unauthorized' })
    }

    try {
        const userToken = token.split(' ')[1]
        const jwtVerified = jwt.verify(userToken, process.env.JWT_SECRET)
        if(jwtVerified) {
            req.user = jwtVerified
            next()
        } else {
            res.status(400).json({success: false, msg: 'Error in the Token'})
        }
    } catch (error) {
        console.log(error)
    }
}

exports.authorizedRoles = (...roles) => async(req,res, next) => {
    if(!roles.include(req.user.role)) {
        return res.status(403).json({success: false, msg: 'Access Denied'})
    }

    next()
}