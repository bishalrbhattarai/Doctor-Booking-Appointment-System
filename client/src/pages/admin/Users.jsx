import { useEffect, useState } from 'react';
import { toast } from "react-toastify"
import { Table } from "antd"
import axios from "axios"
const Users = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {

                setUsers(res.data.data)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    const handleDelete = async (record) => {
        try {

            const res = await axios.post("/api/v1/admin/deleteUser", {
                userId: record._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])


    const columns = [{
        title: "Name",
        dataIndex: "name"
    }, {
        title: "Email",
        dataIndex: "email"
    }, {
        title: "Created At",
        dataIndex: "createdAt"
    },
    {
        title: "Doctor",
        dataIndex: "isDoctor",
        render: (text, record) => (
            <span>{record.isDoctor ? "Yes" : "No"}</span>
        )
    }
        , {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
            <div className="d-flex">
                <button
                    onClick={() => handleDelete(record)}
                    className="btn btn-danger">Delete</button>
            </div>
        )
    }]

    return <>
        <h1 className="text-white p-2 text-center"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >User List</h1>
        {users && (
            <Table columns={columns} dataSource={users} />
        )
        }
    </>
}

export default Users
