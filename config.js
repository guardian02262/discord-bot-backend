module.exports = {
    token: {
        iv: 'a4d367a8a1fff41a8169689db997dbb2',
        content: '591d06f38ddf78816a8e3dfd63355ddac64e0e077d9f8df1e1d517431d660a61f9fc342b599e8c869b50e555f3853a10ea5782d3e65cb792ce2e4d'
    }, // crypto token from bot
    prefix: "v-", // default prefix
    database: "mongodb+srv://guardian:ASDFasdf1234@cluster0.i86ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", // link from mongodb
    clientId: "906758918754148363", //client id from bot
    clientSecret: "8V7ZVnC3ImpLWiE6B7O-ZvsowWytuKdn", // client secret from bot
    callbackurl: "/api/auth/discord/redirect", // callback
    port: 8000, // port
    FRONDEND_URL: "http://guardian-discord-bot-frontend.herokuapp.com" // Front-End URL
}