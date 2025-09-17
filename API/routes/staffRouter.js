const express = require('express')
const router = express.Router()
const { getAllStaffs, addStaff, updateStaffRole, deleteStaff, updateProfile } = require('../controllers/staffControllers')
const { identifier, authorizedRoles } = require('../middlewares/identification')

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllStaffs)
    .post(identifier, authorizedRoles("Admin"), addStaff)

router.route('/:id')
    .patch(identifier, authorizedRoles("Admin", "Pharmacist"), updateProfile)
    .patch(identifier, authorizedRoles("Admin"), updateStaffRole)
    .delete(identifier, authorizedRoles("Admin"), deleteStaff)


module.exports = router
