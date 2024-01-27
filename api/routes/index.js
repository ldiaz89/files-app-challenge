const express = require('express')
const router = express.Router()
const filesController = require('../controllers/getFilesData')

/**
 * Express router configuration for handling file-related routes.
 *
 * @module routes/files
 */

/**
 * Route for fetching data for a single file or multiple files.
 * If a specific file name is provided as a query parameter, it fetches data for that file;
 * otherwise, it fetches data for all available files and filters out any files with errors.
 *
 * @name GET /files/data
 * @function
 * @memberof module:routes/files
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.get('/files/data', filesController.getFilesData)

/**
 * Route for fetching a list of available files.
 *
 * @name GET /files/list
 * @function
 * @memberof module:routes/files
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.get('/files/list', filesController.getFilesList)

module.exports = router
