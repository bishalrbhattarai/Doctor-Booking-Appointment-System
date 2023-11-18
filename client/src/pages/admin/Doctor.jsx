import { useEffect, useState } from 'react';
import { toast } from "react-toastify"
import { Table } from "antd"
import axios from "axios"
const Doctor = () => {
    const [doctors, setDoctors] = useState([])
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post("/api/v1/admin/changeAccountStatus", {
                doctorId: record._id, userId: record.userId, status: status
            }, {
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

    const getDoctors = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllDoctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        getDoctors()
    }, [])
    const columns = [{
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
            <span>{record.firstName} {record.lastName}</span>
        )
    }, {
        title: "Status",
        dataIndex: "status"
    }, {
        title: "Phone",
        dataIndex: "phone"
    },
    {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
            <div className="d-flex">
                {record.status === "pending" ?
                    <>
                        <button className="btn btn-success"
                            onClick={() => handleAccountStatus(record, "approved")}
                        >Approve</button>
                        <button className="btn ms-2 btn-danger"
                            onClick={() => handleAccountStatus(record, "rejected")}
                        >Reject</button>
                    </> : record.status
                }
            </div>
        )
    }]

    return <>
        <h1 className="text-white p-2 text-center"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >Doctor List</h1>
        <Table columns={columns} dataSource={doctors} />

    </>
}

export default Doctor
