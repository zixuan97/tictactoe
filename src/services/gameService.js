import axios from 'axios';
import rootPath from './rootPath';

export const getAllGames = (firstPlayerUsername) => {
  return axios.get(`${rootPath}/games/allGames/${firstPlayerUsername}`).then((res) => res.data);
};

export const createGameRoom = (roomName, firstPlayerUsername) => {
  return axios
    .post(`${rootPath}/games/create`, { roomName, firstPlayerUsername })
    .then((res) => res.data);
};

export const joinGameRoom = (roomName, secondPlayerUsername) => {
  return axios
    .post(`${rootPath}/games/join`, { roomName, secondPlayerUsername })
    .then((res) => res.data);
};
