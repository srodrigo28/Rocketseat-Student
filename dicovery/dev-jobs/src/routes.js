const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Bastião",
    avatar: "https://xesque.rocketseat.dev/users/avatar/profile-69cce0a9-6489-4bf1-a027-2e47ec5a706c-1628087054494.jpg",
    "monthly-budget": 3000,
    "days-per-week": 4,
    "hours-per-day": 150,
    "vacation-per-year": 20,
    "money": 5000
}

routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job-edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

routes.get('/pokemon', (req, res) => res.render(views + "/pokemon.html"))

module.exports = routes;