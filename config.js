/* Token Config Details here */
const ACCOUNT_SID = 'AC720c55b6087f4576fce9b83c976d5175'
const AUTH_TOKEN = 'dc4579222456f040fa602800a63626c9'


const DB_CONFIG = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '1234',
    DB: 'testdb',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const LINK_TO_DB = 'postgres://ftkrvbkn:WOcg_dmMzkJpYlUAXgZFOu_1eWZXMRjj@ziggy.db.elephantsql.com:5432/ftkrvbkn'

const NGROK_LINK = 'http://33394dc5f8a0.ngrok.io'

module.exports = {
    ACCOUNT_SID,
    AUTH_TOKEN,
    DB_CONFIG,
    LINK_TO_DB,
    NGROK_LINK
}