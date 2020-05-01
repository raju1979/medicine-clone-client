// utils/API.js

import axios from "axios";

import { config } from './Constants';

axios.interceptors.request.use(
  config => {
    const token = "ddddddddddddddd";
    if(token()) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
)

export default axios.create({
  baseURL: `${config.url.API_URL}/${config.BASE_URL}`,
  responseType: "json"
});