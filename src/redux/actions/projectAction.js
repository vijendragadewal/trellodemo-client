import { CREATEPROJECT, DELETEPROJECT, PROJECTLIST, UPDATEPROJECT } from "../actionTypes";

export const createProjectAction = (project) => {
  return {
    type: CREATEPROJECT,
    project,
  };
};
export const retrieveProjectsAction = (projectLists) => {
  return {
    type: PROJECTLIST,
    projectLists,
  };
};

export const updateProjectAction = (projectId) => {
  return {
    type: UPDATEPROJECT,
    projectId,
  };
};

export const deleteProjectAction = (projectId) => {
  return {
    type: DELETEPROJECT,
    projectId,
  };
};
