import axios from 'axios';
import backend_api from 'src/config';

const editItems = (value) => {
  return axios.post(backend_api + 'items/edit', {
    value: value,
  });
};

const getItems = () => {
  return axios.get(backend_api + 'items/get');
};

export default {
  editItems,
  getItems,
};
