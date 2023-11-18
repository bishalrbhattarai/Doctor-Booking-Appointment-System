const express = require('express')

const { loginController, registerController,getUserData,applyDoctorController,getAllNotificationController,getAllDoctorsController,bookAppointmentController,
    deleteAllNotificationController,bookingAvailabilityController ,userAppointmentsController,getUserProfileController,updateUserProfileController} = require('../controllers/userControllers')
const {auth} = require("../middlewares/authMiddleware")
const router = express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',auth,getUserData)
router.post('/apply-doctor',auth,applyDoctorController)

router.post('/get-all-notification',auth,getAllNotificationController)

router.post('/delete-all-notification',auth,deleteAllNotificationController)


// getting all doctors 
router.get('/getAllDoctors',auth,getAllDoctorsController)

// Book Appointments 

router.post("/book-appointment",auth,bookAppointmentController)

// Booking Availability

router.post("/booking-availability",auth,bookingAvailabilityController)

// Appointments list

router.post('/user-appointments',auth,userAppointmentsController)

router.get("/getUserProfile",auth,getUserProfileController)

router.post("/updateUserProfile",auth,updateUserProfileController)

module.exports  = router



























