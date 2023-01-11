const dbOperation = require('../database/db-operations')
var popupMsg = require('../constants/popup-message')

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
        "full_name" : req.body.full_name,
        "email" : req.body.email,
        "phone" : req.body.phone,
        "country" : req.body.country
    });

    result.then(data => {
        res.writeHead(200, "Success")
        res.write(JSON.stringify(data));
        return res.end();
    }, err => {
        if(err.code == "ER_DUP_ENTRY")
            res.write(JSON.stringify(popupMsg.messageBody.DUP_USER));
        else
            res.write(JSON.stringify(data));
            
        return res.end();
    })
}

module.exports = {
    getLoginDetails,
    insertIntoSignupTable
}