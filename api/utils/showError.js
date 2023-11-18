const showError = (status,message,res,error) =>{
   return res.status(status).json({
        success:false,
        message,
        error
    })

}
module.exports = {showError}