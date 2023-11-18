const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const auth  = async (req,res,next)=>{
            const token = req.headers['authorization'].split(' ').pop()
        if(!token) {
            return res.json({
                success:false,
                message:"Token is Missing"
            })
        }
        jwt.verify(token,process.env.JWT_SECRET, async(err,decode)=>{
                    if(err){
                        console.log(err)
                        return res.status(200).json({
                            success:false,
                            message:"Authentication Failed"
                        })
                    }else{       
                            try{
                                req.id = decode.id
                                req.user = await User.findById(decode.id)
                                next()    
                            }catch(error){
                                return res.status(500).json({
                                    success:false,
                                    message:"Problem while proccessing",
                                    error
                                })
                            }                        
                    }
        })
}
module.exports = {auth}