import { CREATETICKET, DELETETICKET, TICKETLIST, UPDATETICKET } from "../actionTypes";

export const createTicketAction = (ticket) => {
  return {
    type: CREATETICKET,
    ticket,
  };
};
export const retrieveTicketsAction = (ticketLists) => {
  return {
    type: TICKETLIST,
    ticketLists,
  };
};

export const updateTicketAction = (ticketId) => {
  return {
    type: UPDATETICKET,
    ticketId,
  };
};

export const deleteTicketAction = (ticketId) => {
  return {
    type: DELETETICKET,
    ticketId,
  };
};
