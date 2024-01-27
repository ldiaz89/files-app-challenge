// Crea un archivo axiosConfig.js
import axios from "axios";
// Crea una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/files/",
});

export default axiosInstance;
