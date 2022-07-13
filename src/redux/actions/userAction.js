import { CREATEUSER, UPDATEUSER, DELETEUSER, USERLIST } from "../actionTypes";

export const createUserAction = (user) => {
  return {
    type: CREATEUSER,
    user,
  };
};
export const retrieveUsersAction = (userLists) => {
  return {
    type: USERLIST,
    userLists,
  };
};

export const updateUserAction = (userId) => {
  return {
    type: UPDATEUSER,
    userId,
  };
};

export const deleteUserAction = (userId) => {
  return {
    type: DELETEUSER,
    userId,
  };
};
