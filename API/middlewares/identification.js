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