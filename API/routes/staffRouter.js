const express = require('express')
const router = express.Router()
const { getAllStaffs, addStaff, updateStaffRole, deleteStaff, updateProfile, getStaff } = require('../controllers/staffControllers')
const { identifier, authorizedRoles } = require('../middlewares/identification')

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllStaffs)
    .post(identifier, authorizedRoles("Admin"), addStaff)

router.route('/:id')
    .patch(identifier, authorizedRoles("Admin", "Pharmacist"), updateProfile)
    .patch(identifier, authorizedRoles("Admin"), updateStaffRole)
    .delete(identifier, authorizedRoles("Admin"), deleteStaff)
    .get(identifier, authorizedRoles("Admin", "Pharmacist"), getStaff)

    //add activate or deactive staff

module.exports = router
