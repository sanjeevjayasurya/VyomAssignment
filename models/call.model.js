module.exports = ( sequelize, Sequelize ) => {
    return sequelize.define('CallData', {
        from: {
            type: Sequelize.STRING,
        },
        to: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING
        }
    })
}