import axios from 'axios'
//基地址

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;


export const http = BASE_URL;
export default http;
