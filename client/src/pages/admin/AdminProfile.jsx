import React, { useState, useEffect } from 'react'
import { Col, Form, Input, Row } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
const AdminProfile = () => {
    const [admin, setAdmin] = useState()
    const getAdminProfile = async (req, res) => {
        try {
            const res = await axios.get("/api/v1/admin/getAdminProfile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAdmin(res.data.data)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }

    }

    useEffect(() => {
        getAdminProfile()
    }, [])
    const handleSubmit = async (values) => {
        try {
            const res = await axios.post("/api/v1/admin/updateAdminProfile", {
                ...values
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                setAdmin(res.data.data)
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        }

    }

    return <>
        <h1 className="text-center p-2 text-white"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >  Manage    Admin Profile </h1>
        {admin && (
            <Form
                onFinish={handleSubmit}
                initialValues={{ ...admin }}>
                <Row className="mt-5 ms-5 mb-2 fs-1" gutter={20}>
                    <Col xs={24} md={24} lg={18}
                    >

                        <Form.Item label="Name" name="name"
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="mt-2 ms-5 mb-4" gutter={20}>
                    <Col xs={24} md={24} lg={18} >
                        <Form.Item label="Email" name="email"
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} className="m-auto" md={24} lg={3}>
                        <button className="btn btn-success">Update</button>
                    </Col>
                </Row>
            </Form>
        )
        }
    </>

}

export default AdminProfile
