const app = require('express').Router()
const passport = require('passport')
const cfg = require('../../config')

app.get('/discord', passport.authenticate('discord'));
app.get('/discord/redirect', (req, res) => {
    console.log("redirect req");
    res.redirect(`${cfg.FRONDEND_URL}/account`)
    // try {
    //     console.log("redirect req", req);
    //     passport.authenticate('discord', {
    //         failureRedirect: `${cfg.FRONDEND_URL}/`
    //     }), (req,res) => {
    //         console.log("req", req);
    //         res.redirect(`${cfg.FRONDEND_URL}/account`)
    //     }
    // }
    // catch (error) {
    //     console.log("error", error)
    // }
})

app.get('/', (req, res) => {
    if (req.user) {
        res.json({ msg: "authorized", user: req.user })
    } else {
        res.json({ msg: "unauthorized" })
    }
})
module.exports = app;