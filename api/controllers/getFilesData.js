const axios = require('../axiosConfig')
const fetchDataForFile = async (fileName) => {
  try {
    const response = await axios.get(`file/${fileName}`)

    const responseData = response.data
    const lines = responseData.split('\n').slice(1)
    const formattedLines = lines.map((line) => {
      const [, text = '', number, hex = ''] = line.split(',')

      if (!text || !number || !hex) {
        return null
      }

      return {
        text: text.trim(),
        number: parseInt(number),
        hex: hex.trim()
      }
    })
    return {
      file: fileName,
      lines: formattedLines.filter((data) => data !== null)
    }
  } catch (error) {
    console.error(`Error al obtener datos para ${fileName}: ${error.message}`)
    return { error: 'El archivo tiene un error' }
  }
}
exports.fetchDataForFile = fetchDataForFile
exports.getFilesData = async (req, res) => {
  const { fileName } = req.query
  try {
    if (fileName) {
      const decodedFileName = decodeURIComponent(fileName).replace(/"/g, '')
      const response = await fetchDataForFile(decodedFileName)
      if(response.error){
        return res.json({error: response.error})
      }
      if(response.lines.length === 0){
        return res.json({error:'Empty file'})
      }
      return res.json(response)
    }
    const response = await axios.get('files')

    const files = response.data.files

    const responsesArray = await Promise.all(
      Object.values(files).map(async (fileName) => {
        const responseData = await fetchDataForFile(fileName)
        return responseData
      })
    )

    const filteredArray = responsesArray.filter((file) => !file.error)


    return res.json({ data: filteredArray })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

exports.getFilesList = async (req, res) => {
  try {
    const response = await axios.get('files')

    const files = response.data.files
    return res.json({ files })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}
