import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProjectOperation, updateProjectOperation } from "../../Operations/projects";
import { getProjectById } from "../../services/axiosServices";
import AssignUsers from "../AssingUsers";

const ProjectDetail = () => {
  const { projectId } = useParams();

  const [currentProject, setCurrentProject] = useState({
    id: projectId,
    projectName: "",
    description: "",
    assignUsers: [],
  });
  const [currentUser, setCurrentUser] = useState();

  const [assignUserList, setAssignUserList] = useState([...currentProject.assignUsers]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    getProjectById(projectId)
      .then((response) => {
        setCurrentProject(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  useEffect(() => {
    setCurrentProject((state) => ({ ...state, assignUsers: assignUserList }));
  }, [assignUserList]);

  function getAssignUser() {
    const list = users.map((user) => {
      return (
        <option key={user.id} className="form-control" value={user.id}>
          {user.userName}
        </option>
      );
    });
    return list;
  }
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

  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentProject((state) => ({ ...state, [name]: value }));
  };

  const removeProject = () => {
    dispatch(deleteProjectOperation(projectId))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error("Error on Deleting project===> ", err);
      });
    navigate("/admin/projects");
  };

  const updateContent = () => {
    dispatch(updateProjectOperation(currentProject.id, currentProject))
      .then((response) => {
        console.log(response);
        console.log("The User was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/admin/projects", true);
  };

  return (
    <div className=" mt-5">
      <form className="edit-form">
        <div className="">
          <div className="form-group">
            <label htmlFor="projectName">
              <strong>Project Name </strong>{" "}
            </label>
            <input
              id="projetname"
              className="form-control"
              name="projectName"
              value={currentProject.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              <strong>Description</strong>
            </label>
            <input
              id="description"
              className="form-control"
              name="description"
              value={currentProject.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignusers">
              <strong>Assign User </strong>
            </label>

            {assignUserList &&
              assignUserList.map((id, index) => {
                let { userName } = users.find((user) => user.id === id);

                return <AssignUsers userName={userName} index={index} />;
              })}
            <select
              className="form-control"
              value={currentUser}
              name="assigniuser"
              onChange={handleUserChange}
            >
              <option className="form-control" value={""}>
                Select
              </option>
              {getAssignUser()}
            </select>

            <button className="badge bg-secondary" type="button" onClick={handleAssignUsers}>
              Add
            </button>
          </div>
          <div className="mt-3 ">
            <button className="btn btn-danger" onClick={removeProject}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={updateContent}>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ProjectDetail;
