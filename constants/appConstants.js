const conParamsFromJson = require('../connection-params.json')

const HttpStatusCode = {
    OK : 200,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    INTERNAL_SERVER : 500
}

const connectionParams = {
    host: conParamsFromJson.host,
    user: conParamsFromJson.user,
    password: conParamsFromJson.password,
    port: conParamsFromJson.port,
    database : conParamsFromJson.database
}

const methodTypeConstant = {
    SELECT : 1,
    UPDATE : 2,
    DELETE : 3,
    INSERT : 4
}

module.exports = {
    HttpStatusCode,
    connectionParams,
    methodTypeConstant
}