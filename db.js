const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:changeme@localhost:5432/bvkpitch')

module.exports = sequelize