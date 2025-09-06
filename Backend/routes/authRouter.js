const express = require('express');
const { login, logout, register } = require('../controllers/authControllers');
const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.post('/register', register)

module.exports = router