import { Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DoctorAppointments = () => {

    const user = useSelector(state => state.user.user)
    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useState("")
    const getAppointments = async () => {
        try {
            const res = await axios.post("/api/v1/doctor/doctor-appointments", {
                userId: user?._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
                setStatus(res.data.data.status)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: "Appointment ID", dataIndex: '_id'
        }, {
            title: "Name", dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.userInfo.name}
                </span>

            )
        }, , {
            title: "Date and Time", dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} {" "}{moment(record.time).format("HH:mm")}
                </span>

            )
        }, {
            title: "Status", dataIndex: 'status',
        }, {
            title: "Actions", dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" ? (<>
                        <div className="d-flex">
                            <button className="btn btn-success"
                                onClick={() => handleStatus(record, "approve")}
                            >Approve</button>

                            <button className="btn ms-2 btn-danger"
                                onClick={() => handleStatus(record, "reject")}
                            >Reject</button>
                        </div>
                    </>)
                        : (
                            <div> Appointment Fullfilled </div>
                        )
                    }
                </div>

            )
        },
    ]


    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post("/api/v1/doctor/update-status",
                { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            if (res.data.success) {
                window.location.reload()
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }

    }

    return (
        <>
            <h1 className="text-center text-white p-2"
                style={{
                    backgroundColor: "rgb(37, 51, 77)"
                }}
            >Appointments</h1>

            <Table columns={columns} dataSource={appointments} />
        </>
    )
}

export default DoctorAppointments
