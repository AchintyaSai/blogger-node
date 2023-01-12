const appConstants = require('./appConstants')

const messageBody = {
    DUP_USER :{
        "errorCode" : appConstants.dbErrorCodes.DUP_USER,
        "errorMessage" : "User already exists with this email or phone"
    },

    SOMETHING_WRONG : {
        "errorCode" : "1111",
        "errorMessage" : "Something went wrong"
    },

    OTP_SUCCESS : {
        "errorCode" : "0000",
        "Message" : "OTP verified successfully"
    },
    OTP_FAILURE : {
        "errorCode" : "OTP_FAIL",
        "Message" : "OTP verification failed"
    }
}

module.exports = {
    messageBody
}