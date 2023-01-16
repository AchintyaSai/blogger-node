const dbOperations = require('../database/db-operations')
const popup = require('../constants/popup-message');
const cryptoLayer = require('../core/crypto-layer');


const verifyOtp = (req, res) => {
    var sqlQuery = "SELECT otp_value from otp_table WHERE email='" + req.body.email +"'"
    const verification = dbOperations.executeQuery(sqlQuery);
    verification.then(data => {
        if(req.body.otp == data[0].otp_value.toString()){
            res.status(200)
            deleteOTp(req.body.email);
            cryptoLayer.encryptResponse(popup.messageBody.OTP_SUCCESS, res);
            return res.end();
        }
        else{
            res.status(500)
            cryptoLayer.encryptResponse(popup.messageBody.OTP_FAILURE, res);
            return res.end();
        }
    }, err => {
        cryptoLayer.encryptResponse(err, res)
        return res.end();
    })
}

const deleteOTp = (email) => {
    var sqlQuery = "DELETE from otp_table WHERE email='" + email +"'"
    const verification = dbOperations.executeQuery(sqlQuery);
    verification.then(data => {
        console.log(data);
    }, err => {
        console.error(err);
    })
}


module.exports = {
    verifyOtp
}