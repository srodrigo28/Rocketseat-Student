const express = require("express")
const server = express()
const routes = require('./routes')
const port = 3000

// ususando template engine
server.set('view engine', 'ejs')

// habilitar arquivos staticos
server.use(express.static("public"))

// usando as rotas
server.use(routes)

server.listen(port, () => console.log(`rodando na porta ${port}`))