const app = require('express').Router()
const passport = require('passport')
const cfg = require('../../config')

app.get('/discord', passport.authenticate('discord'));
app.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: `${cfg.FRONDEND_URL}/`
}), (req,res) => {
    res.redirect(`/api/auth`)
})

app.get('/', (req, res) => {
    if (req.user) {
        console.log("authorized")
        req.msg = "authorized"
        // res.json({ msg: "authorized", user: req.user })
    } else {
        console.log("unauthorized")
        req.msg = "unauthorized"
        // res.json({ msg: "unauthorized" })
    }
    res.redirect(`${cfg.FRONDEND_URL}/account`)
})

module.exports = app;