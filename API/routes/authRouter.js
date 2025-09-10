const express = require('express');
const { login, logout, register } = require('../controllers/authControllers');
const { identifier, authorizedRoles } = require('../middlewares/identification');
const router = express.Router()

router.post('/login',login)
router.get('/logout', identifier, logout)
router.post('/register', register)


// ----chat code
// router.get("/admin", authenticate, authorizeRoles("admin"), (req, res) => {
//   res.json({ message: "Admin page" });
// });

// router.get("/pharmacist", authenticate, authorizeRoles("pharmacist"), (req, res) => {
//   res.json({ message: "Pharmacist page" });
// });

module.exports = router