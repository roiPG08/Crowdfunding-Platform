import sendRequest from './sendRequest';

const BASE_PATH = '/api';

export const getProofOfReserve = (options = {}) =>
  sendRequest(`${BASE_PATH}/proof-of-reserve`, {
    method: 'GET',
    ...options,
  });