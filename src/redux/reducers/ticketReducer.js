import { CREATETICKET, DELETETICKET, TICKETLIST } from "../actionTypes";

const intialstate = [];

function ticketReducer(state = intialstate, action) {
  const { type } = action;
  switch (type) {
    case CREATETICKET:
      return [...state, action.ticket];
    case TICKETLIST:
      return action.ticketLists;
    case DELETETICKET:
      return state.filter((state) => state.id !== action.ticketId);
    default:
      return state;
  }
}
export default ticketReducer;
