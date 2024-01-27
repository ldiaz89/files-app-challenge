const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:8080' }))
// Middleware para procesar datos JSON
app.use(express.json())

// Importa y utiliza las rutas
const holaRoutes = require('./routes/index')

app.use(holaRoutes)

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' })
})

// Manejo de errores
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ mensaje: 'Error interno del servidor' })
})

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor de la API escuchando en el puerto ${port}`)
})

module.exports = app
