const bcryptjs = require('bcryptjs')


exports.doHash = (value, salt) => {
    return bcryptjs.hash(value, salt)
}