import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useSelector } from "react-redux"
import moment from "moment"
import { Table } from 'antd'
const Appointments = () => {
    const user = useSelector(state => state.user.user)
    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.post("/api/v1/user/user-appointments", {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: "ID", dataIndex: '_id'
        }, {
            title: "Doctor Name", dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>

            )
        }, {
            title: "Phone", dataIndex: 'phone',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phone}
                </span>

            )
        }, {
            title: "Date and Time", dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} {" "}{moment(record.time).format("HH:mm")}
                </span>

            )
        }, {
            title: "Status", dataIndex: 'status',
        }
    ]
    return <>
        <h1 className="text-white p-2 text-center"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >Appointments</h1>

        <Table columns={columns} dataSource={appointments} />


    </>

}

export default Appointments
