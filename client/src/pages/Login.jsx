import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = ({ buttonName }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // Admin Login
  // email :admin@gmail.com
  // password :admin

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", login);

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const setValue = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-lg-4 col-md-6 col-sm-8 col-10 p-5 border"
            style={{
              margin: "150px auto",
            }}
          >
            <form onSubmit={handleSubmit}>
              <h1 className="text-center"> Login </h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  onChange={(e) => setValue(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={(e) => setValue(e)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  {buttonName}
                </button>
              </div>
              <div className=" mt-2 text-center">
                <h5 className="fw-lighter">
                  {" "}
                  Not Registered ?{" "}
                  <Link className="text-primary" to="/register">
                    Here
                  </Link>{" "}
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
