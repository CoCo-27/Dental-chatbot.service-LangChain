import axios from 'axios';
import backend_api from 'src/config';

const getHistory = (value) => {
  return axios.post(backend_api + 'history/get', { email: value });
};

const addQuestion = (value) => {
  return axios.post(backend_api + 'history/add', value);
};

const objects = {
  addQuestion,
  getHistory,
};
export default objects;
