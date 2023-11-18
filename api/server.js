const express = require('express');
const dotenv = require('dotenv')
require('colors')
const connectDB = require("./config/dbConfig");
const morgan = require('morgan');
dotenv.config()
const app = express();
app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json({success: true});
})


app.use('/api/v1/user',require("./routes/userRoutes"))
app.use('/api/v1/admin',require("./routes/adminRoutes"))
app.use('/api/v1/doctor',require("./routes/doctorRoutes"))




app.listen(process.env.PORT || 8000, async()=>{
    console.log(`Server Started at port ${process.env.PORT}`.bgWhite.blue);
    await connectDB()
})


