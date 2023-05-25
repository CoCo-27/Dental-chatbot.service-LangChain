import axios from 'axios';
import backend_api from 'src/config';

const uploadFile = (formData, onUploadProgress) => {
  return axios.post(backend_api + 'upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

const getPrompt = () => {
  return axios.get(backend_api + 'upload/getPrompt');
};

const embedding = (fileName, email) => {
  return axios.post(backend_api + 'upload/train', {
    filename: fileName,
    email: email,
  });
};

const requestMessage = (value, email) => {
  return axios.post(backend_api + 'upload/requestMessage', {
    value: value,
  });
};

const faqMessage = (value) => {
  return axios.post(backend_api + 'upload/faqMessage', {
    value: value,
  });
};

const object = {
  uploadFile,
  getPrompt,
  embedding,
  requestMessage,
  faqMessage,
};

export default object;
