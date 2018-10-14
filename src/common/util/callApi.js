import axios from 'axios';
import { api } from '../config';

export default function callApi(url, method, params = {}, body = {}) {
  const isServer = (typeof window === 'undefined' || process.env.NODE_ENV === 'test');
  const parseJson = (json) => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  };

  // FIXME: Add your server to server / client to server in configuration
  const baseURL = `http://${api.host}:${api.port}/api`;

  if (isServer) {
    console.log('callApi:', { baseURL, url, params })
  }

  return axios({
    baseURL,
    url: (url || ''),
    method: (method || 'get'),
    headers: {
      'Access-Control-Allow-Origin': '*'
      // Authorization: token,
    },
    crossDomain: true,
    params,
    data: body,
    timeout: api.timeout || 1000,
    transformResponse: [
      (response) => {
        if (typeof response === 'string') {
          return parseJson(response);
        }
        return response;
      },
      (response) => {
        return {
          response,
          requestedOrigin: isServer ? ['server'] : ['server', 'client'],
        };
      }
    ],
  });
}
