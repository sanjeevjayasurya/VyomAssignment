const Sequelize = require('sequelize')
const { LINK_TO_DB, DB_CONFIG } = require('../config')

const sequelize = new Sequelize(LINK_TO_DB, {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.dialect,
    operatorsAlias: false,
    pool: {
        max: DB_CONFIG.pool.max,
        min: DB_CONFIG.pool.min,
        acquire: DB_CONFIG.pool.acquire,
        idle: DB_CONFIG.pool.idle
    }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.call = require('../models/call.model')(sequelize,Sequelize)

module.exports = db 