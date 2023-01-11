const dbOperation = require('../database/db-operations')

const getLoginDetails = (req, res) => {
    var result = dbOperation.selectFromDB("signup_table", []);
    result.then((data) => {
        res.writeHead(200, "Success")
        res.write(JSON.stringify(data));
        return res.end();
    }, (err) => {
        res.write(JSON.stringify(err))
        return res.end();
    })
}

const insertIntoSignupTable = (req, res) => {
    var result = dbOperation.insertIntoDB("signup_table", {
        "id" : "5",
        "full_name" : "Aravindh",
        "email" : "Hello@1234",
        "phone" : "7478724592",
        "country" : "IND"
    });

    result.then(data => {
        res.writeHead(200, "Success")
        res.write(JSON.stringify(data));
        return res.end();
    }, err => {
        res.write(JSON.stringify(err))
        return res.end();
    })
}

module.exports = {
    getLoginDetails,
    insertIntoSignupTable
}