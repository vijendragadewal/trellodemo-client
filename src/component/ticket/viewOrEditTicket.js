import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveProjectsOperation } from "../../Operations/projects";
import { updateTicketOperation } from "../../Operations/tickets";
import { retrieveUsersOperation } from "../../Operations/users";
import { getTicketById } from "../../services/axiosServices";
import { UserDropMenu } from "../UserDropMenu";
import TicketStatus from "./TicketStatus";

export const Ticket = () => {
  const initialState = {
    id: "",
    status: "",
    description: "",
    projectId: "",
    assignUsers: [],
  };

  const { ticketId } = useParams();

  const [currentTicket, setCurrentTicket] = useState(initialState);

  const [isEdit, setIsEdit] = useState(false);
  const [isAssignUser, setIsAssignUser] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const users = useSelector((state) => state.users);

  const getTicket = (id) => {
    getTicketById(id)
      .then((response) => {
        setCurrentTicket(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => getTicket(ticketId), [ticketId]);

  useEffect(() => {
    dispatch(retrieveProjectsOperation());
    dispatch(retrieveUsersOperation());
  }, [dispatch]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentTicket((state) => ({ ...state, [name]: value }));
  };

  const handleUpdate = async () => {
    await updateTicketOperation(ticketId, currentTicket);
    setIsEdit(false);
    setIsAssignUser(false);
    navigate("/admin/tickets", true);
  };

  const handlestatuschange = (event) => {
    console.log(event.target.value);
    setCurrentTicket((state) => ({ ...state, status: event.target.value }));
  };

  const hadleuserselect = (event) => {
    const value = event.target.value;

    if (currentTicket.assignUsers.indexOf(value) === -1) {
      setCurrentTicket((state) => ({
        ...state,
        assignUsers: [...state.assignUsers, value],
      }));
    }
  };
  const getuserName = () => {
    // eslint-disable-next-line array-callback-return
    return users.map((user) => {
      if (currentTicket.assignUsers.indexOf(user.id) !== -1) return user.userName;
    });
  };

  return (
    <div
      className="card mt-5"
      style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}
    >
      <div className="card-body">
        <h4 className="card-title">Tickets</h4>
        <div className="field-group">
          <label htmlFor="status">
            <strong>Tickets status:</strong>
          </label>{" "}
          {isEdit ? (
            <TicketStatus value={currentTicket.status} handleStatusChange={handlestatuschange} />
          ) : (
            currentTicket.status.toUpperCase()
          )}
        </div>
        <div>
          <label htmlFor="description">
            <strong>Description:</strong>
          </label>{" "}
          {isEdit ? (
            <input
              type={"text"}
              id="description"
              name="description"
              value={currentTicket.description}
              onChange={handleChange}
            />
          ) : (
            currentTicket.description
          )}
        </div>
        <div>
          <label>
            <strong>Project Name:</strong>
          </label>{" "}
          {projects &&
            // eslint-disable-next-line array-callback-return
            projects.map((project) => {
              if (currentTicket.projectId === project.id) {
                return project.projectName;
              }
            })}
        </div>
        <div>
          <label>
            <strong>Assign Users:</strong>
          </label>{" "}
          {getuserName()}
        </div>
        {isAssignUser && (
          <UserDropMenu
            value={currentTicket.assignUsers[0]}
            users={users}
            handleUserSelect={hadleuserselect}
          />
        )}
      </div>
      <div style={{ display: "flex" }}>
        {isEdit ? (
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEdit(false)}>
              cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )}
        {isAssignUser ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAssignUser(false)}
            >
              cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setIsAssignUser(true)}>
            AssignUsers
          </button>
        )}
      </div>
    </div>
  );
};
