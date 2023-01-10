const dbOperation = require('../database/db-operations')

const getLoginDetails = (req, res) => {
    console.log(req.query);
    //dbOperation.connectToDB();
    return res.end();
}

module.exports = {
    getLoginDetails
}