
const Appointment = require("../models/appointmentModel")
const  User = require("../models/userModel")
const Doctor = require("../models/doctorModel")

const {showError} = require("../utils/showError")
const getDoctorInfoController =async(req,res)=>{
            try {
                const doctor = await Doctor.findOne({userId:req.body.userId})
                res.status(200).json({
                    success:true,
                    message:"The doctor profile information",
                    data:doctor
                })
            } catch (error) {
                console.log(error)
                showError(500,"Problem While Fetching Doctor Information",res,error)
            }
}

const updateProfileController = async(req,res)=>{
    try {
        console.log("yo chai backend ma k data ako xa vanera log gareko")
        console.log(req.body)
       const doctor = await Doctor.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(201).json({
            success: true,
            message:"Doctor Profile Updated",
            data:doctor
        })
    } catch (error) {
        showError(500,"Problem While Updating Doctor Information",res,error)      
    }
}

const getDoctorByIdController = async (req,res)=>{
        try {
                const doctor = await Doctor.findOne({
                    _id:req.body.doctorId
                })
                res.status(200).json({
                    success:true,
                    message:"Single Doctor Information Fetched Successfully",
                    data:doctor
                })
        } catch (error) {
        showError(500,"Problem While Fetching Single Doctor Information",res,error)      
            
        }
}

const getDoctorAppointmentsController = async (req,res)=>{
    try {
        const doctor = await Doctor.findOne({userId:req.body.userId})
        console.log("the found doctor is and _id is "+doctor._id);
        console.log(doctor)
        const appointments = await Appointment.find({doctorId:doctor._id})
        console.log("the appoints of doctor are:")
        console.log(appointments)
        return res.status(200).json({
            success:true,
            message:"Doctor Appointments Fetched Successfully",
            data:appointments
        })
    } catch (error) {
        console.log(error)
        showError(500,"Problem While Fetching  Doctor Appointment List",res,error)      
    }
}

const updateStatusController = async (req,res)=>{
    try {
            const {appointmentsId,status} =req.body
             await Appointment.findByIdAndUpdate(appointmentsId,{status})

           const appointment=  await Appointment.findOne({_id:appointmentsId})
            const user  = await User.findOne({_id:appointment.userInfo})
            user.notification.push({
                type:"Status-Updated",
                message:`your appointment has been updated ${status}`,
                onClickPath:"/doctor-appointments" 
            })
            await user.save()
            return res.status(200).json({
                success:true,
                message:"Appointment Status updated successfully"
            })

        } catch (error) {
        console.log(error)
        showError(500,"Problem While Updating Status ",res,error)         
    }


}

module.exports = {getDoctorInfoController,updateProfileController,getDoctorByIdController,getDoctorAppointmentsController,updateStatusController}