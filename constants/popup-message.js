const appConstants = require('./appConstants')

const messageBody = {
    DUP_USER :{
        "errorCOde" : appConstants.dbErrorCodes.DUP_USER,
        "errorMessage" : "User already exists with this email or phone"
    },

    SOMETHING_WRONG : {
        "errorCOde" : "0000",
        "errorMessage" : "Something went wrong"
    }
}

module.exports = {
    messageBody
}