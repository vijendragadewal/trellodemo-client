import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/axiosServices";
import Input from "./common/Input";

const Signin = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const Validate = () => {
    if (userName.trim() === "") {
      return { userName: "Username should not be emty" };
    }
    if (userName.length < 5 && userName.length > 30) {
      return {
        userName: "Username should have atleast 3 to 30 character",
      };
    }
    if (password.trim() === "") {
      return { password: "Password should not be empty" };
    }
    if (password.length < 6) {
      return {
        password: "Password should have atleast 6 character",
      };
    }
  };

  const loginByUsernameAndPassword = () => {
    const errormsg = Validate();
    if (errormsg) {
      return setError(errormsg);
    }

    login({ userName, password })
      .then((response) => {
        const { accessToken, id, isAdmin } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userid", id);

        if (isAdmin) {
          navigate("/admin", true);
        } else {
          navigate("/user", true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="edit-form">
      <h5 className="loginheader">Login</h5>
      <div className="loginform">
        <Input
          type="text"
          name="userName"
          label="User Name"
          onChange={(e) => setUsername(e.target.value)}
          errors={error}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          errors={error}
        />

        <div className="mt-3">
          <button type="submit" className="loginbtn mr-2" onClick={loginByUsernameAndPassword}>
            Login
          </button>
          <div className="authContainer">
            <div className="orlable">OR</div>
            <div className="authbutton">
              <label className="authlable">Continue with Google</label>
            </div>
            <div className="authbutton">
              <label className="authlable">Continue with Microsoft</label>
            </div>
            <div className="authbutton">
              <label className="authlable">Continue with Apple</label>
            </div>
          </div>
        </div>
        <Link className="link" to={"/signup"}>
          Can't Log in . SignUp
        </Link>
      </div>
    </div>
  );
};

export default Signin;
