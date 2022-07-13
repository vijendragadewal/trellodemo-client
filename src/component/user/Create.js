import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserOperation } from "../../Operations/users";

const AddNewUser = () => {
  const initialUserState = {
    id: "",
    userName: "",
    email: "",
    password: "123456",
    isAdmin: false,
  };

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleChange = (event) => {
    const {
      target: { checked },
    } = event;
    setUser({ ...user, isAdmin: checked });
  };

  const saveUser = () => {
    const { userName, email, password, isAdmin } = user;
    dispatch(createUserOperation({ userName, email, password, isAdmin }))
      .then((data) => {
        setUser({
          id: data.id,
          userName: data.userName,
          email: data.email,
          isAdmin: data.isAdmin,
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div>
      <h2 className="loginheader">Add New User </h2>

      <div className="submit-form ">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-primary" onClick={newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                required
                value={user.userName}
                onChange={handleInputChange}
                name="userName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={user.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="role">Role</label>
              <input
                type="checkbox"
                className="form-check-input"
                id="role"
                checked={user.isAdmin}
                onChange={handleChange}
                name="role"
              />
            </div>
            <button onClick={saveUser} className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddNewUser;
