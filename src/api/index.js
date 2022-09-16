import axios from "axios";
const api = axios.create({
  baseURL: "https://stark-cove-80514.herokuapp.com/api",
});
export default api;
