const express = require('express')
const routes = express.Router()

const basePath = __dirname + "/views"

routes.get('/', (request, response) => response.sendFile(basePath + "/index.html"))
routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job-edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))

routes.get('/pokemon', (request, response) => response.sendFile(basePath + "/pokemon.html"))

module.exports = routes;