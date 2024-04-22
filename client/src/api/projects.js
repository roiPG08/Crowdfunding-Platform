import sendRequest from './sendRequest';
import axios from 'axios';

export const getAllProjects = (options = {}) =>
    sendRequest(`/api/projects`, {
        method: 'GET',
        ...options,
    });

export const getProjectById = (projectId, options = {}) =>
    sendRequest(`/api/project/${projectId}`, {
        method: "GET",
        ...options,
    });

export const createProjectApi = async (formData, options = {}) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/project/new`, formData);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteProjectApi = (projectId, options = {}) =>
    sendRequest(`/api/delete-project/${projectId}`, {
        method: "DELETE",
        ...options,
    });

export const updateProjectApi = (promptId, projectName, projectDescription, projectGoal, tag, options = {}) =>
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

export const fundProjectApi = (promptId, tx, options = {}) =>
    sendRequest(`/api/project/${promptId}/fund`, {
        body: JSON.stringify({
            tx: tx
        }),
        ...options,
    });

//Axios version of updateProjectApi
//export const updateProjectApi = ( promptId, projectData ) => axios.patch(`${BASE_PATH}/update-project/${promptId}`, projectData);    


