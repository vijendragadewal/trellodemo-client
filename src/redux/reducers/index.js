import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import ticketReducer from "./ticketReducer";
import userReducer from "./usersReducer";

export default combineReducers({
  users: userReducer,
  projects: projectReducer,
  tickets: ticketReducer,
});
