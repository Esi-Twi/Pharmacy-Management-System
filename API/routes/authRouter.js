const express = require('express');
const { login, logout, register } = require('../controllers/authControllers');
const { identifier, authorizedRoles } = require('../middlewares/identification');
const router = express.Router()

router.post('/login',login)
router.get('/logout', identifier, logout)
router.post('/register', register)


module.exports = router