const express = require("express");

const router = express.Router();
const {auth} = require("../middlewares/authMiddleware")

const {getDoctorInfoController,updateProfileController,getDoctorByIdController,getDoctorAppointmentsController,updateStatusController} = require("../controllers/doctorControllers")

router.post('/getDoctorInfo',auth,getDoctorInfoController)
router.post('/updateProfile',auth,updateProfileController)

router.post("/getDoctorById",auth,getDoctorByIdController)
router.post("/doctor-appointments",auth,getDoctorAppointmentsController)

router.post("/update-status",auth,updateStatusController)
module.exports = router

