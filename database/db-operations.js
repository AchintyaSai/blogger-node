const appConstant = require('../constants/appConstants');

var mySqlClient = require('mysql');

const con = mySqlClient.createConnection({
    host: appConstant.connectionParams.host,
    user: appConstant.connectionParams.user,
    password: appConstant.connectionParams.password,
    port: appConstant.connectionParams.port,
    database: appConstant.connectionParams.database
})

function executeQuery(callBack) {
    console.log(con.state);
    // if (con.state == 'disconnected'){
    //     con.connect( (err) => {
    //         if (err) throw err;
    //         console.log("Connected!");
    //         callBack();
    //     });
    // }
    // else
    callBack();
}

function selectFromDB(tableName, columnObj) {
    var promise = new Promise((resolve, reject) => {
        executeQuery(() => {
            try {
                var sql = constructSqlQuery(appConstant.methodTypeConstant.SELECT, tableName, columnObj)
                console.log(sql)
                con.query(sql, (err, result, fields) => {
                    if (err) reject(err)
                    else resolve(result)
                })
            } catch (ex) {
                reject(ex);
            }
        })
    });

    return promise;
}

function insertIntoDB(tableName, dataObj) {
    var promise = new Promise((resolve, reject) => {
        executeQuery(() => {
            try {
                var sql = constructSqlQuery(appConstant.methodTypeConstant.INSERT, tableName, dataObj)
                console.log(sql)
                con.query(sql, (err, result, fields) => {
                    if (err) reject(err)
                    else resolve(result)
                })
            } catch (ex) {
                reject(ex);
            }
        })
    });

    return promise;
}

function constructSqlQuery(queryType, tableName, obj) {
    switch (queryType) {
        case appConstant.methodTypeConstant.SELECT:
            if (obj.length == 0)
                return "SELECT * from " + tableName;
            else {
                var selectQuery = "SELECT ";
                obj.forEach((element, index) => {
                    if (index != obj.length - 1)
                        selectQuery += element + ","
                    else
                        selectQuery += element
                });
                selectQuery += " from " + tableName;
                return selectQuery;
            }
            break;

        case appConstant.methodTypeConstant.INSERT:
            var insertQuery = "INSERT into "+tableName+" ("
            Object.keys(obj).forEach((element, index) => {
                if(index != Object.keys(obj).length - 1)
                    insertQuery += element+","
                else
                    insertQuery += element+")"
            })

            insertQuery += " VALUES (";

            Object.keys(obj).forEach((element, index) => {
                if(index != Object.keys(obj).length - 1)
                    insertQuery += "'"+ obj[element]+"',"
                else
                    insertQuery += "'"+ obj[element]+"')"
            });

            return insertQuery; 
    }
}

module.exports = {
    selectFromDB,
    insertIntoDB
}