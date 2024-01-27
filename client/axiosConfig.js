import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/files/",
});

export default axiosInstance;
