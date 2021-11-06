const app = require('express').Router()
const authentification = require('./api/auth')
const discord = require('./api/discord')

app.use('/auth', authentification)
app.use('/discord', discord)

module.exports = app;