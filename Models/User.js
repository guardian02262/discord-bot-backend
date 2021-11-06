const { Schema, model } = require('mongoose')

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
        type: ObjectId,
        ref: 'Role.id'
    }
})

module.exports = model('User', schema)