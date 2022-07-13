import {
  createTicketAction,
  deleteTicketAction,
  retrieveTicketsAction,
  updateTicketAction,
} from "../../redux/actions/ticketAction";
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  updateTicket,
} from "../../services/axiosServices";

export const createTicketOperation =
  (status, description, projectId, assignUsers) => async (dispatch) => {
    try {
      const res = await createTicket({ status, description, projectId, assignUsers });
      dispatch(createTicketAction(res.data));
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const retrieveTicketsOperation = () => async (dispatch) => {
  try {
    const res = await getAllTickets();
    dispatch(retrieveTicketsAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateTicketOperation = (id, data) => async (dispatch) => {
  try {
    const res = await updateTicket(id, data);
    dispatch(updateTicketAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteTicketOperation = (id) => async (dispatch) => {
  try {
    const res = await deleteTicket(id);
    dispatch(deleteTicketAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
