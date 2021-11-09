const app = require('express').Router()
const passport = require('passport')
const cfg = require('../../config')

app.get('/discord', passport.authenticate('discord'));
app.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: `${cfg.FRONDEND_URL}/`
}), (req,res) => {
    const client = require('../../bot/src')
    res.redirect(`${cfg.FRONDEND_URL}/server/1`)
})

app.get('/', (req, res) => {
    if (req.user) {
        console.log("authorized")
        res.json({ msg: "authorized", user: req.user })
    } else {
        console.log("unauthorized")
        res.json({ msg: "unauthorized" })
    }
})

module.exports = app;