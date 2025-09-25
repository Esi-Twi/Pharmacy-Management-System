const express = require('express')
const router = express.Router()
const { getAllStaffs, addStaff, updateStaffRole,updateStaffStatus, deleteStaff, updateProfile, getStaff } = require('../controllers/staffControllers')
const { identifier, authorizedRoles } = require('../middlewares/identification')

router.route('/')
    .get(identifier, authorizedRoles("Admin"), getAllStaffs)
    .post(identifier, authorizedRoles("Admin"), addStaff)

router.route('/:id')
    .delete(identifier, authorizedRoles("Admin"), deleteStaff)
    .get(identifier, authorizedRoles("Admin"), getStaff)

router.route('/profile/:id')
    .patch(identifier, authorizedRoles("Admin", "Pharmacist"), updateProfile)

router.route("/role/:id")
    .patch(identifier, authorizedRoles("Admin"), updateStaffRole)

router.route("/status/:id")
    .patch(identifier, authorizedRoles("Admin"), updateStaffStatus)


module.exports = router
