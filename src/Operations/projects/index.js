import {
  createProjectAction,
  deleteProjectAction,
  retrieveProjectsAction,
  updateProjectAction,
} from "../../redux/actions/projectAction";
import { deleteTicketAction } from "../../redux/actions/ticketAction";
import {
  getAllProjects,
  updateProject,
  createProject,
  deleteProject,
  getAllTickets,
  deleteTicket,
} from "../../services/axiosServices";

export const createProjectOperation =
  (projectName, description, assignUsers) => async (dispatch) => {
    try {
      const res = await createProject({ projectName, description, assignUsers });
      dispatch(createProjectAction(res.data));
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveProjectsOperation = () => async (dispatch) => {
  try {
    const res = await getAllProjects();
    dispatch(retrieveProjectsAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateProjectOperation = (id, data) => async (dispatch) => {
  try {
    const res = await updateProject(id, data);
    dispatch(updateProjectAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteProjectOperation = (id) => async (dispatch) => {
  try {
    const tickets = await getAllTickets().then((response) => response.data);
    const deleteticket = tickets.filter((ticket) => ticket.projectId === id);
    deleteticket.forEach((ticket) => {
      deleteTicket(ticket.id).then((res) => res.data);
      dispatch(deleteTicketAction(ticket.id));
    });
    const res = await deleteProject(id);

    dispatch(deleteProjectAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
