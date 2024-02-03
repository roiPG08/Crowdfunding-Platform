import sendRequest from './sendRequest';

const BASE_PATH = '/api/profile';

export const editProfileApi = ({ id, name }) =>
  sendRequest(`${BASE_PATH}/${id}`, {
    body: JSON.stringify({
      id,
      name,
    }),
  });