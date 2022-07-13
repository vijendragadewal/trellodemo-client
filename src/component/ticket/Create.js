import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTicketOperation } from "../../Operations/tickets";
import { retrieveUsersOperation } from "../../Operations/users";

const AddTicket = () => {
  const { id } = useParams();

  const initialUserState = {
    id: "",
    status: "todo",
    description: "",
    projectId: id,
    assignUsers: [],
  };
  const [ticket, setTicket] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsersOperation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicket({ ...ticket, [name]: value });
  };

  function getAssignUser() {
    const list = users.map((user) => {
      return (
        <option className="form-control" value={user.id}>
          {user.userName}
        </option>
      );
    });
    return list;
  }

  const handleChange = (event) => {
    setCurrentUser(event.target.value);
  };

  const saveTicket = () => {
    const { status, description, projectId, assignUsers } = ticket;
    assignUsers.push(currentUser);
    dispatch(createTicketOperation(status, description, projectId, assignUsers))
      .then((data) => {
        setTicket({
          id: data.id,
          status: data.status,
          description: data.description,
          projectId: data.projectId,
          assignUsers: data.assignUsers,
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newticket = () => {
    setTicket(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newticket}>
            Add More Ticket
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group mt-5">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={ticket.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Assign User</label>
            <select
              type="select"
              className=" form-control form-select-input"
              id="assignuser"
              value={currentUser}
              onChange={handleChange}
              name="role"
            >
              <option value={""}>Select</option>
              {getAssignUser()}
            </select>
          </div>
          <button onClick={saveTicket} className="btn btn-primary mt-2">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTicket;
