import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Row } from "antd"
import DoctorList from '../components/DoctorList'
const Home = () => {
    const [doctors, setDoctors] = useState([])
    const getDoctorData = async () => {
        try {
            const res = await axios.get("/api/v1/user/getAllDoctors", {
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
    return (
        <>
            <h1 className="text-white p-2 text-center"
                style={{
                    backgroundColor: "rgb(37, 51, 77)"
                }}
            >Available Doctors</h1>
            <Row>
                {
                    doctors.map((doctor) => (
                        <DoctorList doctor={doctor} />
                    ))
                }
            </Row>

        </>
    )
}

export default Home
