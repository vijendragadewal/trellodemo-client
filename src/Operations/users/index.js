import { createUser, updateUser, getAllUsers, deleteUser } from "../../services/axiosServices";
import {
  createUserAction,
  updateUserAction,
  deleteUserAction,
  retrieveUsersAction,
} from "../../redux/actions/userAction";

export const createUserOperation =
  ({ userName, password, email, isAdmin }) =>
  async (dispatch) => {
    try {
      const res = await createUser({ userName, email, password, isAdmin });
      dispatch(createUserAction(res.data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const retrieveUsersOperation = () => async (dispatch) => {
  try {
    const res = await getAllUsers();
    dispatch(retrieveUsersAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateUserOperation = (id, data) => async (dispatch) => {
  try {
    const res = await updateUser(id, data);
    dispatch(updateUserAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteUserOperation = (id) => async (dispatch) => {
  try {
    const res = await deleteUser(id);
    dispatch(deleteUserAction(id));
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
