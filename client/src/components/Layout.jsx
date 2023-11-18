import { useState } from 'react'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import "./Layout.css"
import { userMenu, adminMenu } from '../Data/data';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
const Layout = () => {
    const user = useSelector(state => state.user.user)


    const doctorMenu =
        [
            {
                name: "Home",
                path: "/",
                icon: "fa-solid fa-house"
            }, {
                name: "Appoinments",
                path: "/doctor/appointments",
                icon: "fa-solid fa-list"
            }, {
                name: "Profile",
                path: `/doctor/profile/${user?._id}`,
                icon: "fa-solid fa-user"
            }
        ];







    const navigate = useNavigate()

    console.log(user)
    const navMenu = user.isAdmin == true ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
    const location = useLocation()
    return Object.keys(user).length ?
        <div className="container-fluid vh-100">
            <div className="row mt-2 no-gutters ">
                <div className="col-2  sidebar border  ">
                    <div
                        style={{
                            height: "90px",
                            margin: "20px",
                            marginBottom: "5px"
                        }}
                        className="logo text-center">
                        <h4 style={{
                            color: "white"
                        }}>
                            Doc App
                            <i class=" ms-3 fa-solid fa-hospital-user"></i>
                        </h4>

                        <hr style={{
                            color: "white"
                        }} />
                    </div>
                    <div className="menu">
                        {
                            navMenu.map((menu, index) => {
                                return <>
                                    <div key={index} className={`div-menu row text-center`}
                                        id={menu.path == location.pathname ? "change" : null}
                                        style={{
                                            height: "65px"
                                        }}
                                    >
                                        <div className="col-3 m-auto">
                                            <i className={`${menu.icon}`}></i>
                                        </div>
                                        <div className="col-9 m-auto"><NavLink
                                            to={menu.path}>{menu.name}</NavLink></div>
                                    </div>
                                </>
                            })
                        }
                        <div className="div-menu row text-center"
                            style={{
                                height: "65px"
                            }}
                        >
                            <div className="col-3 m-auto">
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="col-9 m-auto">
                                <NavLink to="/logout">Logout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row no-gutters"
                    >
                        <div className="col-12 m-2 border">
                            <div className="row"
                                style={{
                                    height: "55px"
                                }}>
                                <div className="col-3"

                                    style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                        marginLeft: "auto"
                                    }}
                                >
                                    <Badge
                                        onClick={(e) => {
                                            navigate("/notification")
                                        }}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        count={user.notification.length}
                                    >
                                        <i
                                            style={{
                                                cursor: "pointer"
                                            }}
                                            className="fa-solid fa-bell p-1 fs-5"></i>
                                    </Badge>



                                    <Link className="text-black ms-3" to="/profile"

                                        style={{

                                            textDecoration: "none"
                                        }}
                                    >  {user.name.toUpperCase()} </Link>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row vh-100 no-gutters">
                        <div className="col-12 m-2  border"
                        >
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div > :
        <Outlet />
}

export default Layout
