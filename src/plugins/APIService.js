import axios from 'axios';

//---------------for local
const SERVER_URL = 'http://localhost:8085/';

export const AXIOS = axios.create({
  baseURL: SERVER_URL
});

