const appConstant = require('../constants/appConstants');

var mySqlClient = require('mysql');

var con = mySqlClient.createConnection({
    host: appConstant.connectionParams.host,
    user: appConstant.connectionParams.user,
    password: appConstant.connectionParams.password,
    port: appConstant.connectionParams.port

    
})

function connectToDB() {
    if (con.state == 'disconnected')
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
}

module.exports = {
    connectToDB
}