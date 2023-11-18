const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const { showError } = require("../utils/showError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const registerController = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(200).json({
        success: false,
        message: "This email is already registered",
      });
    if (req.body.email === "admin@gmail.com" && req.body.password === "admin") {
      req.body.isAdmin = true;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    await User.create({
      ...req.body,
      password: hashed,
    });
    return res.status(200).json({
      success: true,
      message: "User Successfully Registered",
    });
  } catch (error) {
    showError(500, "Error while Registering ", res, error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({
        success: false,
        message: "User is not Register!!",
      });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(403).json({
        success: false,
        message: "Password not Matching!!",
      });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Sucessfull",
      user,
      token,
    });
  } catch (error) {
    showError(500, "Error while Login", res, error);
  }
};

const getUserData = (req, res) => {
  req.user._doc.password = null;
  return res.json({
    success: true,
    message: "User data Send",
    data: {
      ...req.user._doc,
    },
  });
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await Doctor.create({
      ...req.body,
      status: "pending",
    });
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.status(200).json({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while applying for doctor", res, error);
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = seennotification;
    const updatedUser = await user.save();
    console.log("After marking");
    console.log(updatedUser);
    res.status(200).json({
      success: true,
      message: "All Notification Marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while Getting Notification", res, error);
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).json({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    showError(500, "Error while Getting All Doctors List", res, error);
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New Appointment Request",
      message: `A new Appointment Request From ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while Booking Appointment", res, error);
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = null;
    res.status(200).json({
      success: true,
      message: "All Notification are deleted",
      data: updatedUser,
    });
  } catch (error) {
    showError(500, "Error while Deleting Notification", res, error);
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    console.log("start from time", fromTime);
    console.log("end to time", toTime);
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).json({
        message: "Appointments not available at the moment",
        success: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Appointment Available",
      });
    }
  } catch (error) {
    console.log(error);
    showError(500, "Error while Checking Availabilty", res, error);
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.body.userId,
    });
    return res.status(200).json({
      success: true,
      message: "User Appointments List Fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while Fetching Appointments List", res, error);
  }
};

const getUserProfileController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id });
    return res.status(200).json({
      success: true,
      message: "User Profile Fetched Successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while Fetching User Profile", res, error);
  }
};

const updateUserProfileController = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.id }, req.body);
    const user = User.findOne({ _id: req.id });

    return res.status(200).json({
      success: true,
      message: "User Profile Updated Successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    showError(500, "Error while Fetching User Profile", res, error);
  }
};

module.exports = {
  loginController,
  registerController,
  getUserData,
  applyDoctorController,
  getAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  deleteAllNotificationController,
  bookingAvailabilityController,
  userAppointmentsController,
  getUserProfileController,
  updateUserProfileController,
};
