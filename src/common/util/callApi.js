import axios from 'axios';
import { application, api } from '../config';

export default function callApi(url, method, getParams = {}, postData = {}, token = '') {
  const isServer = (typeof window === 'undefined' || process.env.NODE_ENV === 'test');
  const baseURL = isServer ? `http://localhost:${application.port}/api` : '/api';
  const rooturl = isServer ? global.__CLIENT_URL__ : window.location.pathname;
  const parseJson = (json) => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  };

  return axios({
    baseURL,
    url: (url || ''),
    method: (method || 'get'),
    headers: {
      Authorization: token,
      rooturl,
    },
    params: getParams,
    data: postData,
    timeout: api.timeout || 1000,
    transformResponse: [
      (response) => {
        if (typeof response === 'string') {
          return parseJson(response);
        }
        return response;
      },
      (response) => {
        if (response.data) {
          return {
            ...response,
            data: {
              requestedOrigin: isServer ? ['server'] : ['server', 'client'],
            },
          };
        }
        return response;
      },
    ],
  });
}
