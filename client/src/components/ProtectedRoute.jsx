import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, setUser } from '../redux/features/userSlice'

import axios from 'axios'
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user)

    const getUser = async () => {
        try {
            const { data } = await axios.post("/api/v1/user/getUserData", {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (data.success) {
                dispatch(setUser(data.data))
            } else {
                localStorage.clear()
                navigate("/login")
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if (Object.keys(user).length == 0) {
            getUser()
        }
    }, [user])



    if (!localStorage.getItem('token')) {
        <Navigate to="/login" />
    }
    else {
        return children
    }


}

export default ProtectedRoute
