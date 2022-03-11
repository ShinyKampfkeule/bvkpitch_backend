const {Sequelize, DateType} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const Compareable_Offers = sequelize('compareable_offers', {
    offer_date: {type: DateType.STRING},
    sqm_price_cents: {type: DateType.INTEGER},
    build_year: {type: DateType.INTEGER},
    area: {type: DateType.INTEGER},
    rooms: {type: DateType.INTEGER},
    route: {type: DateType.STRING},
    street_number: {type: DateType.STRING}
})
Compareable_Offers.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = Compareable_Offers