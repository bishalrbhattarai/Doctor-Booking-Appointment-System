import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { Col, Form, Input, Row, TimePicker } from 'antd'
import moment from 'moment'

const Profile = ({ buttonName }) => {
    const [timings] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector(state => state.user.user)
    const [doctor, setDoctor] = useState(null)
    // handle submit function
    async function handleSubmit(values) {
        try {
            console.log("the sent value is ")
            console.log(values)
            // API CALL to UPDATE THE DOCTOR PROFILE

            if (values.timings && values.timings.length == 2) {
                timings = [
                    moment(values.timings[0].$d).format("HH:mm"),
                    moment(values.timings[1].$d).format("HH:mm")
                ]

            } else {
                timings = doctor.timings.map(timing => timing)
            }

            const res = await axios.post("/api/v1/doctor/updateProfile", {
                ...values,
                userId: user._id,
                timings: timings
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                // window.location.reload()
                navigate("/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post(`/api/v1/doctor/getDoctorInfo`, {
                userId: params.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res.data.data)
            if (res.data.success) {
                setDoctor(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        getDoctorInfo()
    }, [])
    return (
        <>
            <h1 className="text-center">Manage Doctor Profile</h1>
            {doctor && (
                // form ma onFinish ma handlesubmit vanne function chha dada
                <Form className="m-3" layout='vertical' onFinish={handleSubmit}
                    initialValues={
                        {
                            ...doctor,
                            timings: [
                                moment(doctor.timings[0], "HH:mm"),
                                moment(doctor.timings[1], "HH:mm")
                            ]
                        }
                    }>

                    <h3 class="fw-light">Personal Details :</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="First Name" name="firstName" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="First Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Last Name" name="lastName" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Last Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Phone Number" name="phone" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Phone Number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Email" name="email" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Website" name="website"
                            >
                                <Input type="text" placeholder="Website" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Address" name="address" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3 class="fw-light">Professional Details :</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Specialization" name="specialization" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Specialization" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Experience" name="experience" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Experience" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Fees Per Consultation" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Timings" name="timings">
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} className="m-auto" md={24} lg={3}>
                            <button className="btn btn-primary">{buttonName}</button>
                        </Col>
                    </Row>
                </Form>

            )}
        </>
    )
}

export default Profile
