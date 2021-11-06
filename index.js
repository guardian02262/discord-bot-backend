require('./Routers/strategies/discord');
const express = require('express')
const app = express();
const cors = require('cors')
const passport = require('passport')
let mongoose = require('mongoose')
const cfg = require('./config')
var session = require('express-session')
mongoose.connect(cfg.database)
let aplicatie = require('./Routers/api')
const MongoDbStore = require('connect-mongo');
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: cfg.database
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', aplicatie)

app.listen(cfg.port, () => {
    console.log('Work!')
})