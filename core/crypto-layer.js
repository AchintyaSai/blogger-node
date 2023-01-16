const crypto = require('crypto-js')
require('dotenv').config()

const decryptBody = (req,res,next) => {
    if(process.env.ENCRYPTION_ENABLED == "true"){
        var decryptedBody  = crypto.AES.decrypt(req.body.encryptedBody, '999999999').toString(crypto.enc.Utf8);
        req.body = JSON.parse(decryptedBody);
    }
    console.log(req.body)
    next();
}

const encryptResponse = (data, res) => {
    let stringifiedRes = JSON.stringify(data);
    if(process.env.ENCRYPTION_ENABLED == "true"){
        var encryptRes = crypto.AES.encrypt(stringifiedRes, '999999999').toString();
        res.json({ 'encryptedResponse' : encryptRes});
    }
    else{
        res.json(data)
    }
}

module.exports = {
    decryptBody,
    encryptResponse
}