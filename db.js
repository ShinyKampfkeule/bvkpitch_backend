const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize(`postgres://postgres:changeme@${process.env.DB_HOST}:5433/postgres`)
const sequelize = new Sequelize(`postgres://postgres:changeme@localhost:5433/postgres`)

module.exports = sequelize