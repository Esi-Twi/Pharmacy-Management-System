const jwt = require('jsonwebtoken')

exports.identifier = async (req, res, next) => {
    let token

    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization
    } else {
        token = req.cookies['Authorization']
    }

    if (!token) {
        return res.status(401).json({ success: false, msg: 'Unauthorized' })
    }

    try {
        const userToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token
        const jwtVerified = jwt.verify(userToken, process.env.JWT_SECRET)
        if(jwtVerified) {
            req.user = jwtVerified
            next()
        } else {
            res.status(400).json({success: false, msg: 'Error in the Token'})
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, msg: 'Token expired, please login again.' })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, msg: 'Invalid token.' })
        } else {
            return res.status(500).json({ success: false, msg: 'Something went wrong.', error: error.message })
        }
    }
}

exports.authorizedRoles = (...roles) => async(req,res, next) => {
    if(!roles.includes(req.user.role)) {
        return res.status(403).json({success: false, msg: 'Access Denied'})
    }

    next()
}