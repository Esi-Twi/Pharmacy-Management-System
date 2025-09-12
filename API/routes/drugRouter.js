const express = require('express')
const router = express.Router()
const { getAllDrugs, addNewDrug, editDrug, deleteDrug } = require('../controllers/drugsControllers')
const {identifier,authorizedRoles } = require('../middlewares/identification')

router.route('/')
    .get(identifier, authorizedRoles("Admin", "Pharmacist"), getAllDrugs)
    .post(identifier, authorizedRoles("Admin"),addNewDrug)

router.route('/:id')
    .patch(identifier, authorizedRoles("Admin"),editDrug)
    .delete(identifier, authorizedRoles("Admin"),deleteDrug)


module.exports = router
