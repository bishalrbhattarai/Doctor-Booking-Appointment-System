const User = require("../models/userModel")
const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel")
const {showError} = require("../utils/showError")

const getAllUsersController = async(req,res)=>{
    try {

       const users =  await User.find({isAdmin:false}) 
       

       res.status(200).send({
        success: true,
        message:"Users Data Loaded Successfully",
        data: users
       })

    } catch (error) {
        console.log(error)
        showError(500,"Error while Fetching Users",res,error)
    }

}
const getAllDoctorsController = async(req,res)=>{
    try {
        const doctors = await Doctor.find()

        res.status(200).send({
            success: true,
            message:"Doctors Data Loaded Successfully",
            data: doctors
           })

    } catch (error) {
        console.log(error)
        showError(500,"Error while Fetching Doctors",res,error)
    }

}


const changeAccountStatusController = async(req,res)=>{
    try{
        const {doctorId,status} = req.body    
        const  doctor = await Doctor.findByIdAndUpdate(doctorId,{
            status      
        })
        const user = await User.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type:"doctor-account-request-updated",
            message:`Your Doctor Account request Has Been ${status}`,
            onClickPath:"/notification"
        })
        const foundDoctor = await Doctor.findOne({_id:doctorId})
        if(foundDoctor.status === "pending"){
            user.isDoctor= false;
        }else if(foundDoctor.status ==="approved"){
            user.isDoctor = true
        }
        await user.save() 
       

        res.status(200).send({
            success:true,
            message:"Account Status Updated",
            data:doctor
        })

    }catch(error){
        console.log(error)
        showError(500,"Account Status Updation Failed",res,error)
    }

}

const getAdminProfileController = async(req,res)=>{
    try {
       const admin =  await User.findOne({isAdmin:true})
       return res.status(200).json(
        {
            success:true,message:"Admin Data Fetched Successfully",
        data:{
            name:admin.name,
            email:admin.email
        }
    })
    } catch (error) {
        console.log(error)
        showError(500,"Error while Fetching Admin Profile",res,error)
    }

}

const updateAdminProfileController = async(req,res)=>{
    try {
            await User.findOneAndUpdate({isAdmin:true},req.body) 
            const admin = User.find({isAdmin:true})
                res.status(200).json({
                    success:true,
                    message:"Admin Profile Updated",
                    data:{
                        name:admin.name,
                        email:admin.email
                    }
                })          
    } catch (error) {
        console.log(error)
        showError(500,"Admin Profile Updation Failed",res,error)
    }

}

const deleteUserController = async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.body.userId)
            await Doctor.findOneAndDelete({userId:req.body.userId})
            await Appointment.findOneAndDelete({userId:req.body.userId})
            await Appointment.findOneAndDelete({doctorId:req.body.userId})
            const users = await User.find({isAdmin:false})
            res.status(200).json({
             success:true,
             message:"User deleted",
             data:users   
            })
        } catch (error) {
            console.log(error)
        showError(500,"User Deletion Operation Failed",res,error)
        }
}


module.exports = {getAllUsersController,getAllDoctorsController,changeAccountStatusController,updateAdminProfileController,getAdminProfileController,deleteUserController}