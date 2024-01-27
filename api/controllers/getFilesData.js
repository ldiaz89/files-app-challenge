const axios = require('../axiosConfig')

/**
 * Fetches data for a specific file using an HTTP GET request with Axios.
 *
 * @param {string} fileName - The name of the file to fetch data from.
 * @returns {Promise<Object>} - An object containing information about the file and its formatted lines.
 *   - file: The name of the file.
 *   - lines: An array of objects representing the formatted lines of the file.
 *       - text: The text of the line.
 *       - number: The line number (parsed as an integer).
 *       - hex: The hexadecimal value of the line.
 *   - error: An error message if there is an issue fetching data from the file.
 */
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
/**
 * Retrieves data for a single file or multiple files based on the provided query parameters.
 * If a specific file name is provided, it fetches data for that file; otherwise, it fetches data
 * for all available files and filters out any files with errors.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
exports.getFilesData = async (req, res) => {
  const { fileName } = req.query
  try {
    if (fileName) {
      const decodedFileName = decodeURIComponent(fileName).replace(/"/g, '')
      const response = await fetchDataForFile(decodedFileName)
      if (response.error) {
        return res.json({ error: response.error })
      }
      if (response.lines.length === 0) {
        return res.json({ error: 'Empty file' })
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
/**
 * Retrieves a list of available files from the server.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */

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
