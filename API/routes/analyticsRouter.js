const express = require('express')
const router = express.Router()
const {identifier, authorizedRoles} = require('../middlewares/identification')
const { getDashboardData, getDailyReport, getMonthlyReport, getWeeklyReport, getYearlyReport } = require('../controllers/analyticsController')


router.route("/dashboard").get(identifier, authorizedRoles("Admin"), getDashboardData)
router.route("/daily").get(identifier, authorizedRoles("Admin"), getDailyReport)
router.route("/weekly").get(identifier, authorizedRoles("Admin"), getWeeklyReport)
router.route("/monthly").get(identifier, authorizedRoles("Admin"), getMonthlyReport)
router.route("/yearly").get(identifier, authorizedRoles("Admin"), getYearlyReport)



module.exports = router
