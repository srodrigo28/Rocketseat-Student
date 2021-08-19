const express = require("express")
const server = express()
const routes = require('./routes')
const port = 3000

server.use(express.static("public"))

server.use(routes)

server.listen(port, () => console.log(`rodando na porta ${port}`))