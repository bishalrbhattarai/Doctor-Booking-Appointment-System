const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/authMiddleware")
const {getAllUsersController,getAllDoctorsController,changeAccountStatusController,updateAdminProfileController, getAdminProfileController,deleteUserController} = require("../controllers/adminControllers")


router.get("/getAllUsers",auth,getAllUsersController)
router.get("/getAllDoctors",auth,getAllDoctorsController)
router.post("/changeAccountStatus",auth,changeAccountStatusController)

router.post("/updateAdminProfile",auth,updateAdminProfileController)
router.get("/getAdminProfile",auth,getAdminProfileController)

router.post("/deleteUser",auth,deleteUserController)


module.exports = router