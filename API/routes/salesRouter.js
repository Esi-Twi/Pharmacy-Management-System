const express = require('express');
const { identifier, authorizedRoles } = require('../middlewares/identification');
const { createSales, getAllSales, getTodaysSales } = require('../controllers/salesController');
const router = express.Router()

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllSales)

router.route('/today')
    .get(identifier, authorizedRoles("Admin", "Pharmacist"), getTodaysSales)

router.route('/:id')
    .post(identifier, authorizedRoles("Pharmacist"), createSales)

    
module.exports = router;

