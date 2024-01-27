// Crea un archivo axiosConfig.js
const axios = require('axios')

// Crea una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: 'https://echo-serv.tbxnet.com/v1/secret/',
  headers: {
    Authorization: 'Bearer aSuperSecretKey'
  }
})

module.exports = axiosInstance
