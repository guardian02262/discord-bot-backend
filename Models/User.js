const { Schema, model } = require('mongoose')
const Role = require('./Role');

let schema = Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    discordTag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true
    },
    role: {
        type: Array
    }
})

module.exports = model('User', schema)