import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProjectOperation } from "../../Operations/projects";
import { retrieveUsersOperation } from "../../Operations/users";
import Input from "../common/Input";

const AddProject = () => {
  const initialUserState = {
    id: "",
    projectName: "",
    description: "",
    assignUsers: [],
  };
  const [project, setProject] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [assignUserList, setAssignUserList] = useState([...project.assignUsers]);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsersOperation());
  }, [dispatch]);

  useEffect(() => {
    setProject((state) => ({ ...state, assignUsers: assignUserList }));
  }, [assignUserList]);

  const handleChange = (event) => {
    setCurrentUser(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleAssignUsers = () => {
    if (assignUserList.length === 0) {
      setAssignUserList([currentUser.toString()]);
    } else {
      if (assignUserList.indexOf(currentUser) === -1) {
        setAssignUserList((state) => [...state, currentUser.toString()]);
      }
    }
    setCurrentUser("");
  };

  function getAssignUser() {
    const list = users.map((user) => {
      return (
        <option className="form-control" key={user.id} value={user.id}>
          {user.userName}
        </option>
      );
    });
    return list;
  }

  const saveProject = () => {
    const { projectName, description, assignUsers } = project;

    dispatch(createProjectOperation(projectName, description, assignUsers))
      .then((data) => {
        setProject({
          id: data.id,
          projectName: data.projectName,
          description: data.description,
          assignUsers: data.assignUsers,
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getuserName = () => {
    // eslint-disable-next-line array-callback-return
    return users.map((user) => {
      if (project.assignUsers.indexOf(user.id) !== -1) return user.userName;
    });
  };

  const newproject = () => {
    setProject(initialUserState);
    setSubmitted(false);
  };

  return (
    <div>
      <h2 className="loginheader">Add Project </h2>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newproject}>
              Add Project
            </button>
          </div>
        ) : (
          <div>
            <Input
              name="projectName"
              label="Project Name"
              value={project.projectName}
              onChange={handleInputChange}
            />
            <Input
              name="description"
              label={"Description"}
              value={project.description}
              onChange={handleInputChange}
            />

            <div className="form-group">
              <label htmlFor="role">Assign User </label>
              {getuserName()}
              <select
                type="select"
                className=" form-control form-select-input"
                id="assignuser"
                value={currentUser}
                onChange={handleChange}
                name="role"
              >
                {getAssignUser()}
              </select>
              <button className="badge bg-secondary" type="button" onClick={handleAssignUsers}>
                Add
              </button>
            </div>
            <button onClick={saveProject} className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddProject;
