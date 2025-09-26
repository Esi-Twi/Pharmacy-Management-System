const express = require('express');
const { identifier, authorizedRoles } = require('../middlewares/identification');
const { createSales, getAllSales, getTodaysSales } = require('../controllers/salesController');
const router = express.Router()


//admin can view all sales, weekly, sales, montly sales, yearly sales

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllSales)

router.route('/today')
    .get(identifier, authorizedRoles("Admin", "Pharmacist"), getTodaysSales)

router.route('/:id')
    .post(identifier, authorizedRoles("Pharmacist"), createSales)

    
module.exports = router;

