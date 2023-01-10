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
    port: conParamsFromJson.port
}

module.exports = {
    HttpStatusCode,
    connectionParams
}