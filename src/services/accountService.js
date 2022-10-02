import axios from 'axios';
import rootPath from './rootPath';

export const login = (user) => {
  return axios.post(`${rootPath}/users/login`, user);
};

export const register = (user) => {
  return axios.post(`${rootPath}/users/create`, user).then((res) => res.data);
};

export const getUser = (username) => {
  return axios.get(`${rootPath}/users/details/${username}`).then((res) => res.data);
};