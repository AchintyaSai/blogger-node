const app = require('express')();
const jwt = require('jsonwebtoken');
const cryptoLayer = require('../core/crypto-layer')

const generateToken = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time :Date(),
        userId : 12
    }

    const token = jwt.sign(data, jwtSecretKey);
    cryptoLayer.encryptResponse(token, res);
    return res.end();
}

const verifyToken = (req, res, next) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log(verified)
            next();
        }
        else{
            // Access Denied
            res.status(401);
            cryptoLayer.encryptResponse("Authentication failed", res);
            res.end()
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

module.exports = {
    generateToken,
    verifyToken
}

