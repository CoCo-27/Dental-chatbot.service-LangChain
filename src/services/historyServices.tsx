import axios from 'axios';
import backend_api from 'src/config';

const getHistory = () => {
  return axios.get(backend_api + 'history/get');
};

const addQuestion = (value) => {
  return axios.post(backend_api + 'history/add', value);
};

const objects = {
  addQuestion,
  getHistory,
};
export default objects;
