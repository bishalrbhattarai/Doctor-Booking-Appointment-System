import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/features/userSlice'
import { toast } from 'react-toastify';

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
        dispatch(removeUser())
        toast.success("Logout Successful")
        navigate("/login")
    }, [])
}

export default Logout
