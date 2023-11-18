import { Tabs } from "antd"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const NotificationPage = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const handleMarkAllRead = async (e) => {
        try {
            const res = await axios.post("/api/v1/user/get-all-notification", { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                window.location.reload()
                navigate("/")
            } else {
                toast.error(res.data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }

    const handleMarkAllDelete = async (e) => {
        try {
            const res = await axios.post("/api/v1/user/delete-all-notification", {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                window.location.reload()
                navigate("/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }

    return <>
        <h1 className=" text-center  text-white p-3"
            style={{
                backgroundColor: "rgb(37, 51, 77)"
            }}
        >Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab="UNREAD NOTIFICATIONS" key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2 border text-white bg-black"
                        onClick={handleMarkAllRead}
                    >✔ Mark All Read
                    </h4>
                </div>
                {
                    user?.notification?.map(notificationMgs => (
                        <div className="card"
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-text"
                                onClick={() => navigate(notificationMgs.onClickPath)}
                            >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>

            <Tabs.TabPane tab="READ NOTIFICATIONS" key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2 text-white bg-black"
                        onClick={handleMarkAllDelete}

                    >❌ Delete All Read</h4>
                </div>
                {
                    user?.seennotification?.map(notificationMgs => (
                        <div className="card"

                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-text"
                                onClick={() => navigate(notificationMgs.onClickPath)}
                            >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>

        </Tabs>
    </>
}

export default NotificationPage
