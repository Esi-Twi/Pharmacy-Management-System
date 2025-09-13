const express = require('express')
const router = express.Router()
const { getAllStaffs, addStaff, updateStaff, deleteStaff, updateProfile } = require('../controllers/staffControllers')
const { identifier, authorizedRoles } = require('../middlewares/identification')

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllStaffs)
    .post(identifier, authorizedRoles("Admin"), addStaff)

router.route('/:id')
    .patch(identifier, authorizedRoles("Admin", "Pharmacist"), updateStaff, updateProfile)
    .delete(identifier, authorizedRoles("Admin"), deleteStaff)


module.exports = router
