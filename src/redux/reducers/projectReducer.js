import { CREATEPROJECT, DELETEPROJECT, PROJECTLIST } from "../actionTypes";

const intialstate = [];

function projectReducer(state = intialstate, action) {
  const { type } = action;
  switch (type) {
    case CREATEPROJECT:
      return [...state, action.project];
    case PROJECTLIST:
      return action.projectLists;
    case DELETEPROJECT:
      return state.filter((state) => state.id !== action.projectId);
    default:
      return state;
  }
}
export default projectReducer;
