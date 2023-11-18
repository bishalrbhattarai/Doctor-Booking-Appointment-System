import React from 'react'
// import { useState } from 'react'
import { Col, Form, Input, Row, TimePicker } from 'antd'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
const Appoinment = ({ buttonName }) => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    async function handleSubmit(values) {
        try {

            const res = await axios.post("/api/v1/user/apply-doctor", {
                ...values,
                userId: user._id,
                timings: [
                    moment(values.timings[0].$d).format("HH:mm"),
                    moment(values.timings[1].$d).format("HH:mm")

                ]

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
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return <>
        <h1 className="text-white p-2 text-center"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >Apply Doctor</h1>
        <Form className="m-3" layout='vertical' onFinish={handleSubmit}>
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
                    <Form.Item label="Timings" name="timings" required
                        rules={[{ required: true }]}
                    >
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


    </>
}

export default Appoinment
