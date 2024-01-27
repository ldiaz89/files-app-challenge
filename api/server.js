const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const holaRoutes = require('./routes/index')

app.use(holaRoutes)

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' })
})

app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ mensaje: 'Error interno del servidor' })
})

app.listen(port, () => {
  console.log(`Servidor de la API escuchando en el puerto ${port}`)
})

module.exports = app
