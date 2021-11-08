const app = require('express').Router()
const passport = require('passport')
const cfg = require('../../config')

app.get('/discord', passport.authenticate('discord'));
app.get('/discord/redirect', (req, res, next) => {
    try {
        passport.authenticate('discord', {
            failureRedirect: `${cfg.FRONDEND_URL}/`
        })
        next();
    }
    catch (error) {
        console.log("error", error)
    }
}, (req,res) => {
    console.log("req", req);
    res.redirect(`${cfg.FRONDEND_URL}/account`)
})

app.get('/', (req, res) => {
    if (req.user) {
        res.json({ msg: "authorized", user: req.user })
    } else {
        res.json({ msg: "unauthorized" })
    }
})
module.exports = app;