import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(options.headers || {}),
    'Content-type': isFormData ? 'multipart/form-data' : 'application/json; charset=UTF-8',
  };

  const response = await fetch(`${getRootUrl()}${path}`, {
    method: 'POST',
    credentials: 'same-origin',
    ...options,
    headers,
  });

  return response;
}