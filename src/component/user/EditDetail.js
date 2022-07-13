import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserOperation, updateUserOperation } from "../../Operations/users";
import { getUserById } from "../../services/axiosServices";

const UserDetail = (props) => {
  const initialUserState = {
    id: null,
    userName: "",
    email: "",
    isAdmin: false,
  };

  const { userId } = useParams();

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = (userId) => {
    getUserById(userId)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleRoleChange = (event) => {
    const {
      target: { checked },
    } = event;
    setCurrentUser({ ...currentUser, isAdmin: checked });
  };
  //
  const updateContent = () => {
    dispatch(updateUserOperation(currentUser.id, currentUser))
      .then((response) => {
        console.log(response);
        setMessage("The User was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/admin/users", true);
  };

  const removeUser = () => {
    dispatch(deleteUserOperation(currentUser.id))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/admin/users", true);
  };

  return (
    <div className="mt-5">
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={currentUser.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2 md-2">
              <label>
                <strong>Admin:</strong>
              </label>
              <input
                type={"checkbox"}
                checked={currentUser.isAdmin}
                name="role"
                id="role"
                onChange={handleRoleChange}
              />
            </div>
          </form>

          <button className="btn btn-danger mt-2" onClick={removeUser}>
            Delete
          </button>
          <button type="submit" className="btn btn-primary mt-2" onClick={updateContent}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};
export default UserDetail;
