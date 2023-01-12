const dbOperations = require('../database/db-operations')
const popup = require('../constants/popup-message');


const verifyOtp = (req, res) => {
    var sqlQuery = "SELECT otp_value from otp_table WHERE email='" + req.body.email +"'"
    const verification = dbOperations.executeQuery(sqlQuery);
    verification.then(data => {
        if(req.body.otp == data[0].otp_value.toString()){
            deleteOTp(req.body.email);
            res.writeHead(200, "Success");
            res.write(JSON.stringify(popup.messageBody.OTP_SUCCESS));
            return res.end();
        }
        else{
            res.writeHead(500, "Internal Server Error") 
            res.write(JSON.stringify(popup.messageBody.OTP_FAILURE));
            return res.end();
        }
    }, err => {
        res.write(JSON.stringify(err))
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