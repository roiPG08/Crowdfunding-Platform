import sendRequest from './sendRequest';
import axios from 'axios';

const BASE_PATH = 'http://localhost:8080/api';

export const getAllProjects = (options = {}) =>
    sendRequest(`/api/projects`, {
        method: 'GET',
        ...options,
    });

export const getProjectById = ( projectId, options = {} ) =>
    sendRequest(`/api/project/${projectId}`, {
        method: "GET",
        ...options,
    });

export const createProjectApi = ( projectName, projectDescription, projectGoal, userId, tag ) =>
    sendRequest(`/api/project/new`, {
        body: JSON.stringify({
            project_name: projectName,
            description: projectDescription,
            goal: projectGoal,
            userId: userId,
            tag: tag
        }),
    });

export const deleteProjectApi = ( projectId, options = {} ) =>
    sendRequest(`/api/delete-project/${projectId}`, {
        method: "DELETE",
        ...options,
    });

    export const updateProjectApi = ( promptId, projectName, projectDescription, projectGoal, tag, options = {} ) =>
    sendRequest(`/api/update-project/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
            project_name: projectName,
            description: projectDescription,
            goal: projectGoal,
            tag: tag
        }),
        ...options,
    });

    //Axios version of updateProjectApi
    //export const updateProjectApi = ( promptId, projectData ) => axios.patch(`${BASE_PATH}/update-project/${promptId}`, projectData);    


