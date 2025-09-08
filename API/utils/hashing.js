const bcryptjs = require('bcryptjs')


exports.doHash = (value, salt) => {
    return bcryptjs.hash(value, salt)
}

exports.doHashValidation = (value, hashedValue) => {
    return bcryptjs.compare(value, hashedValue)
}