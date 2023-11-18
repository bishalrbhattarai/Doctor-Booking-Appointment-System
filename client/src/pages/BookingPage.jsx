import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import { useSelector } from "react-redux"
const BookingPage = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const params = useParams()
    const [doctors, setDoctors] = useState({})
    const [date, setDate] = useState("")
    const [time, setTime] = useState()
    const [isAvailable, setIsAvailable] = useState(false)
    const handleBooking = async () => {

        try {
            if (!date && !time) {
                return alert("Date and Time Required")
            }
            const res = await axios.post("/api/v1/user/book-appointment", {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                date: date,
                time: time,
                userInfo: user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/")
            } else {
                toast.error(res.data.message)
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }

    const handleAvailability = async () => {

        console.log(` the time is ${time}`)
        console.log(`The  time is ${date}`)
        try {
            if (!date && !time) {
                return alert("Date and Time Required")
            }
            const res = await axios.post("/api/v1/user/booking-availability", {
                doctorId: params.doctorId,
                date,
                time
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                setIsAvailable(true)
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }


    const getDoctorData = async () => {
        try {
            const res = await axios.post("/api/v1/doctor/getDoctorById", {
                doctorId: params.doctorId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])



    return <>
        <h3 className="text-white p-3 text-center"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}>Booking Page</h3>
        <div className="container  ">
            {
                doctors && (
                    <>
                        <h5 className="fw-light" > Doctor Name: Dr. {doctors.firstName} {doctors.lastName}</h5>
                        <h5 className="fw-light">Fees : {doctors.feesPerConsultation}</h5>
                        <h5 className="fw-light">Timings :  {doctors?.timings?.length > 0 ? doctors.timings[0] : null} - {doctors?.timings?.length > 0 ? doctors.timings[1] : null}</h5>
                        <div className="d-flex flex-column w-50">
                            <DatePicker format="DD-MM-YYYY"
                                className="m-2"
                                onChange={(value) => {
                                    setDate(moment(value.$d).format("DD-MM-YYYY"))
                                }
                                }
                            />
                            <TimePicker format="HH:mm"
                                className="m-2"

                                onChange={(value) => {

                                    setTime(moment(value.$d).format('HH:mm'))
                                }
                                }
                            />
                            <button className="btn btn-primary mt-2"
                                onClick={handleAvailability}
                            >Check Availability</button>


                            <button className="btn btn-dark mt-2"
                                onClick={handleBooking}
                            >Book Now</button>



                        </div>

                    </>
                )
            }
        </div>
    </>
}

export default BookingPage
