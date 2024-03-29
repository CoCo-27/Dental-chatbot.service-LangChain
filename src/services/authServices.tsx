import axios from 'axios';
import backend_api from 'src/config';

const authRegister = (data) => {
  console.log(data);
  return axios.post(backend_api + 'user/register', data);
};

const authLogin = (data) => {
  return axios.post(backend_api + 'user/login', data);
};

const getUser = (email) => {
  return axios.post(backend_api + 'user/getUser', email);
};

const logOut = (data) => {
  return axios.post(backend_api + 'user/logout', data);
};

const handleGoogleAuther = (data) => {
  return axios.post(backend_api + 'user/handleGoogleAuther', { email: data });
};

const forgotPassword = (data) => {
  return axios.post(backend_api + 'user/forgotPassword', data);
};

const resetPassword = (data) => {
  return axios.post(backend_api + 'user/resetPassword', data);
};

const objects = {
  authRegister,
  authLogin,
  forgotPassword,
  resetPassword,
  handleGoogleAuther,
  logOut,
  getUser,
};

export default objects;
