import axios from "axios";

const axiosInstance = (() => {
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
    },
  });
})();

const login = (data) => {
  return axiosInstance.post("/auth", data);
};
const signupUser = (data) => {
  return axiosInstance.post("/auth/signup", data);
};
//For Project
const getAllProjects = () => {
  return axiosInstance.get("/projects");
};
const getProjectById = (id) => {
  return axiosInstance.get(`/projects/${id}`);
};
const createProject = (data) => {
  return axiosInstance.post("/projects", data);
};
const updateProject = (id, data) => {
  return axiosInstance.put(`/projects/${id}`, data);
};
const deleteProject = (id) => {
  return axiosInstance.delete(`/projects/${id}`);
};
//for Tickets
const getAllTickets = () => {
  return axiosInstance.get("/tickets");
};
const getTicketById = (id) => {
  return axiosInstance.get(`/tickets/${id}`);
};
const createTicket = (data) => {
  return axiosInstance.post("/tickets", data);
};
const updateTicket = (id, data) => {
  return axiosInstance.put(`/tickets/${id}`, data);
};
const deleteTicket = (id) => {
  return axiosInstance.delete(`/tickets/${id}`);
};
//For User
const getAllUsers = () => {
  return axiosInstance.get("/users");
};
const getUserById = (id) => {
  return axiosInstance.get(`/users/${id}`);
};
const createUser = (data) => {
  return axiosInstance.post("/users", data);
};
const updateUser = (id, data) => {
  return axiosInstance.put(`/users/${id}`, data);
};
const deleteUser = (id) => {
  return axiosInstance.delete(`/users/${id}`);
};

export {
  login,
  signupUser,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
