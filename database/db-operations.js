const appConstant = require('../constants/appConstants');

var mySqlClient = require('mysql');

var con = mySqlClient.createConnection({
    host: appConstant.connectionParams.host,
    user: appConstant.connectionParams.user,
    password: appConstant.connectionParams.password,
    port: appConstant.connectionParams.port,
    database : appConstant.connectionParams.database
})

function connectToDB() {
    if (con.state == 'disconnected'){
        con.connect( (err) => {
            if (err) throw err;
            console.log("Connected!");
            // return "Connected!"
        });
    }
}

function insert(tabelName){
    
}

module.exports = {
    connectToDB
}