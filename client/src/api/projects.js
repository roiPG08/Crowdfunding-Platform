import sendRequest from './sendRequest';

const BASE_PATH = '/api/project';

export const getAllProjects = (options = {}) =>
    sendRequest(`${BASE_PATH}s`, {
        method: 'GET',
        ...options,
    });

export const getProjectById = ( projectId, options = {} ) =>
    sendRequest(`${BASE_PATH}/${projectId}`, {
        method: "GET",
        ...options,
    });

export const createProjectApi = ( projectName, projectDescription, projectGoal, userId, tag ) =>
    sendRequest(`${BASE_PATH}/new`, {
        body: JSON.stringify({
            project_name: projectName,
            description: projectDescription,
            goal: projectGoal,
            userId: userId,
            tag: tag
        }),
    });

export const deleteProjectApi = ( projectId, options = {} ) =>
    sendRequest(`${BASE_PATH}/${projectId}`, {
        method: "DELETE",
        ...options,
    });

export const updateProjectApi = ( promptId, prompt, tag, options = {} ) =>
    sendRequest(`${BASE_PATH}/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
            prompt: prompt,
            tag: tag
        }),
        ...options,
    });


