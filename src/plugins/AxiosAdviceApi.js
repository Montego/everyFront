import axios from "axios";
const ADVICE_API_URL = 'http://fucking-great-advice.ru/api/random';
export const AXIOS_ADVICE = axios.create({
  baseURL: ADVICE_API_URL
});
