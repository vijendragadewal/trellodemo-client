import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signupUser } from "../services/axiosServices";
import Input from "./common/Input";

const SignUp = () => {
  const initialUserState = {
    id: "",
    userName: "",
    email: "",
    password: "",
    isAdmin: false,
  };
  const [user, setUser] = useState(initialUserState);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const Validate = () => {
    const { userName, email, password } = user;
    let errormsg = {};
    if (userName.trim() === "") {
      errormsg = { ...errormsg, userName: "Username is reuired" };
    }
    if (userName.length < 5 && userName.length > 30) {
      errormsg = { ...errormsg, userName: "Username should have atleast 3 to 30 character" };
    }
    if (password.trim() === "") {
      errormsg = { ...errormsg, password: "Password is required" };
    }
    if (password.length < 6) {
      errormsg = { ...errormsg, password: "Password should have atleast 6 character" };
    }
    if (email.trim() === "") {
      errormsg = { ...errormsg, email: "Email is required" };
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errormsg = { ...errormsg, email: "invalid email Address" };
    }
    return errormsg;
  };

  const saveUser = () => {
    const { userName, email, password, isAdmin } = user;
    const error = Validate();

    if (error) {
      setError(error);
      return;
    }
    signupUser({ userName, email, password, isAdmin })
      .then((response) => {
        if (response.status === 200) {
          setMsg(response.massage);
          setSubmitted(true);
          setStatus(true);
        }
        console.log(response.data);
      })
      .catch((e) => {
        setMsg("User Already Exist");
        setSubmitted(true);
        console.error("ERROR===>" + e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);

    setSubmitted(false);
    setStatus(false);
    navigate("/", true);
  };

  return (
    <div className="edit-form">
      <h4 className="loginheader">Sign Up </h4>
      <div className="loginform">
        {submitted ? (
          <div>
            <h4>{msg}</h4>
            {status ? (
              <button className="btn btn-primary" onClick={newUser}>
                Login
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setUser(initialUserState);
                  setSubmitted(false);
                }}
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <div className="">
            <Input
              name="userName"
              label="Username"
              value={user.userName}
              onChange={handleInputChange}
              errors={error}
            />
            <Input
              type="email"
              name="email"
              label="Email"
              value={user.email}
              onChange={handleInputChange}
              errors={error}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={user.password}
              onChange={handleInputChange}
              errors={error}
            />

            <div className="mt-3">
              <button type="submit" onClick={saveUser} className="loginbtn mt-3">
                SignUp
              </button>
            </div>
            <Link className="link" to={"/"}>
              Already have an account? Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUp;
