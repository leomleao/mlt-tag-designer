import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'https://mlt-tag-back.herokuapp.com/',
  // baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Content-type': 'application/json',
  },
  responseType: 'json',
});
