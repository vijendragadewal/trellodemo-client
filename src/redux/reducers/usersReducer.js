import { CREATEUSER, DELETEUSER, USERLIST } from "../actionTypes";

const intialstate = []; //  User's List {id,userName,email,isAdmin,password}

function userReducer(state = intialstate, action) {
  const { type } = action;
  switch (type) {
    case CREATEUSER:
      return [...state, action.user];
    case USERLIST:
      return action.userLists;
    case DELETEUSER:
      return state.filter((state) => state.id !== action.userId);
    default:
      return state;
  }
}
export default userReducer;
