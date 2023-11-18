import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice'


// Admin register credentials :
// name: admin
// email:admin@gmail.com
// password:admin

const Register = ({ buttonName }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/register", login)
            if (data.success) {
                toast.success(data.message)
                navigate("/login")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const setValue = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-8 p-5 col-10  border"
                        style={{
                            margin: "140px auto",
                        }}
                    >

                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center ">  Register </h1>

                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" name="name"
                                    onChange={(e) => setValue(e)}
                                />

                            </div>


                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"
                                    onChange={(e) => setValue(e)}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                                    onChange={(e) => setValue(e)}
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">{buttonName}</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
